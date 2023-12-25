import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Post.css";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Image } from "cloudinary-react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

const server = "http://localhost:8800/api/posts";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState(null);
  const [post, setPost] = useState({
    email: "",
    name: "",
    country: "",
    phone: "",
    sex: "",
    food: "",
    ingredients: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const hideAlert = () => {
    setAlertMessage(null);
  };

  useEffect(() => {
    if (user && id === "new") {
      setPost((prevPost) => ({
        ...prevPost,
        name: `${user.username} ${user.surname}`,
        email: user.email,
        country: user.country,
        phone: user.phone,
        sex: user.sex,
      }));
    }

    if (!id) return;
    const fetchPost = async () => {
      const { data } = await axios.get(`${server}/${id}`);
      setPost(data);
    };
    fetchPost();
  }, [id, user]);

  const handleChange = (e) => {
    console.log("handleChange triggered");
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    setLoading(true);

    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dr4iesryu/image/upload",
        formData
      );

      setPost((prevPost) => ({
        ...prevPost,
        imageUrl: response.data.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.food || !post.ingredients || !post.imageUrl) {
      showAlert("Please fill up all required fields!");
      return;
    }
    setLoading(true);

    try {
      if (id === "new") {
        await axios.post(server, post);
        window.alert("Post recipes successful");
      } else {
        await axios.put(`${server}/${id}`, post);
      }
      window.alert("update recipes success");
      navigate("/");
      console.log("Update Successful.");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={`post__wrapper ${user ? "" : "blurred1"}`}>
      {user ? (
        <div className="container2">
          {alertMessage && (
            <div className="custom-alert">
              <p>{alertMessage}</p>
              <button onClick={hideAlert}>OK</button>
            </div>
          )}
          <NavLink to="/" className="close-button1" onClick={handleCancel}>
            <CloseIcon />
          </NavLink>

          <form className="post">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={post.name}
              onChange={handleChange}
            />
            <input
              className="disbaleinput"
              type="text"
              placeholder="Email"
              name="name"
              value={post.email}
              onChange={handleChange}
              disabled={true}
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={post.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={post.country}
              onChange={handleChange}
            />
            <input
              className="disbaleinput"
              type="text"
              placeholder="Gender"
              name="sex"
              value={post.sex}
              onChange={handleChange}
              disabled={true}
            />
            <input
              type="text"
              placeholder="Food"
              name="food"
              value={post.food}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="ingredients"
              name="ingredients"
              value={post.ingredients}
              onChange={handleChange}
            />
            <div className="image-upload">
              <label className="uploadicon" htmlFor="file-input">
                {loading ? "Uploading... Please wait." : "Upload Image"}
                <br></br>
                <CloudUploadIcon />
              </label>
              <input
                id="file-input"
                type="file"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <div className="file-input-info">
                {post.imageUrl && (
                  <Image
                    cloudName="dr4iesryu"
                    publicId={post.imageUrl}
                    width="150"
                  />
                )}

                {post.imageUrl && (
                  <button
                    className="btnclose"
                    onClick={() =>
                      setPost((prevPost) => ({ ...prevPost, imageUrl: "" }))
                    }
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            </div>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="lButton"
            >
              {loading ? (
                <CircularProgress size={17} color="white" />
              ) : (
                "Confirm"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="login-message">
          <p>Sorry, you need to log in to view these secret recipes!</p>
        </div>
      )}
    </div>
  );
};

export default Post;