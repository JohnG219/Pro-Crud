import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Posts.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import UserProfile from "../Userprofile/Userprofile";

const server = "https://server-pro-crud.onrender.com/api/posts";

const Posts = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [clickedStars, setClickedStars] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [showOwned, setShowOwned] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleProfileClick = (post) => {
    console.log("Profile clicked. User information is hidden for privacy.");
    setSelectedUser(post);
  };

  const closeProfileModal = () => {
    setSelectedUser(null);
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(server);
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (post) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this recipes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${server}/${post._id}`);
          setPosts(posts.filter((p) => p._id !== post._id));
          Swal.fire("Deleted!", "Your post recipes has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting post:", error);
          Swal.fire("Error", "Failed to delete the post.", "error");
        }
      }
    });
  };


  const handleLike = async (post) => {

    if (!likedPosts.includes(post._id)) {
      const updatedPosts = posts.map((p) =>
        p._id === post._id ? { ...p, likes: p.likes + 1 } : p
      );
      setPosts(updatedPosts);
      setLikedPosts([...likedPosts, post._id]);
      setClickedStars((prevClickedStars) => [...prevClickedStars, post._id]);

      await axios.put(`${server}/like/${post._id}`, { userId: user._id });
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
  const currentPosts = sortedPosts
    .filter(
      (post) =>
        (!showOwned || (user && post.email === user.email)) &&
        post.food.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  const noOwnedPosts = showOwned && user && currentPosts.length === 0;

  useEffect(() => {
    setNoResults(currentPosts.length === 0);
  }, [currentPosts]);

  const page = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`posts ${user ? "" : "blurred"}`}>
      {loading ? (
        <div className="loading-spinner">Loading... Please wait...</div>
      ) : user ? (
        <div className="container">
          {currentPage === 1 && (
            <>
              <button onClick={() => navigate("/post/new")} className="newbtn">
                New Post
              </button>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={showOwned}
                    onChange={() => setShowOwned(!showOwned)}
                  />
                  Show Owned
                </label>
              </div>
              <div className="searchfood">
                <input
                  type="text"
                  placeholder="search food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>Food</th>
                <th>ingredients</th>
                <th className="likestitle">Satisfied</th>
              </tr>
            </thead>
            <tbody>
              {noResults || noOwnedPosts ? (
                <tr>
                  <td colSpan="3">
                    {noOwnedPosts
                      ? "You don't have any posts yet!"
                      : `No results found for "${searchQuery}".`}
                  </td>
                </tr>
              ) : (
                currentPosts.map((post) => (
                  <tr key={post._id}>
                    <td id="titles"> {post.food} </td>
                    <td> {post.ingredients} </td>
                    <td>
                      <div className="icon-container">
                        <span className="like-count">
                          <p id="postliketxt">{post.likes}</p>
                        </span>
                      </div>
                      <button
                        onClick={() => handleLike(post)}
                        className="starbtn"
                      >
                        <div className="icon-container">
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ fontSize: "32px", color: "#FFD700" }}
                            className={`star-icon ${
                              likedPosts.includes(post._id) ? "gold-star" : ""
                            } ${
                              clickedStars.includes(post._id) ? "clicked" : ""
                            }`}
                          />
                        </div>
                      </button>
                    </td>
                    <td>
                      <img
                        src={post.imageUrl}
                        alt="Post"
                        className="post-image"
                      />
                    </td>
                    <th>
                      <p className="displayblock">{post.email}</p>
                      <p id="recipesowner">Recipes Owner:</p>
                      <br></br>
                      <p
                        id="ownername"
                        onClick={() => handleProfileClick(post)}
                      >
                        {post.name}
                      </p>
                      {user && user.email === post.email && (
                        <>
                          <td>
                            <button
                              onClick={() => navigate(`/post/${post._id}`)}
                              className="btn btn-primary"
                            >
                              Update
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDelete(post)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="nextprev">
            <button
              onClick={() => page(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentPage === 1 || searchQuery === "" || showOwned) {
                  page(currentPage + 1);
                } else {
                  alert("NaN.");
                }
              }}
              disabled={indexOfLastPost >= posts.length}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="login-message">
          <p>Sorry, you need to log in to view these secret recipes!</p>
        </div>
      )}
      {selectedUser && (
        <UserProfile user={selectedUser} onClose={closeProfileModal} />
      )}
    </div>
  );
};

export default Posts;
