import { useEffect, useState } from "react";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { RiCloseLargeFill } from "react-icons/ri";
import axios from "../axios/axios";

function PostData() {
  const { id } = useParams();
  const [user, userSet] = useState({});
  const [comment, commentSet] = useState([]);
  const token = localStorage.getItem("token");
  const [text, textSet] = useState("");
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    if (!token) return;
    Read();
  }, [id, token]);

  useEffect(() => {
    if (!token) return;
    axios
      .get("/api/auth", { headers: { "x-auth-token": token } })
      .then((res) => {
        console.log(res);
        setAuthUser(res.data);
      })
      .catch((error) => console.log(error));
  }, [token]);

  function Read() {
    axios
      .get(`/api/posts/${id}`, { headers: { "x-auth-token": token } })
      .then((res) => {
        userSet(res.data);
        commentSet(res.data.comments);
      })
      .catch((error) => console.log(error));
  }

  function SubmitText(event) {
    event.preventDefault();
    axios
      .post(
        `/api/posts/comment/${id}`,
        { text },
        { headers: { "x-auth-token": token } }
      )
      .then(() => {
        textSet("");
        Read();
      })
      .catch((error) => console.log(error));
  }

  function handleLike(postId) {
    axios
      .put(
        `/api/posts/like/${postId}`,
        {},
        { headers: { "x-auth-token": token } }
      )
      .then(() => Read())
      .catch((error) => console.log(error));
  }

  function handleUnlike(postId) {
    axios
      .put(
        `/api/posts/unlike/${postId}`,
        {},
        { headers: { "x-auth-token": token } }
      )
      .then(() => Read())
      .catch((error) => console.log(error));
  }

  function handleDeleteComment(commentId) {
    axios
      .delete(`/api/posts/comment/${id}/${commentId}`, {
        headers: { "x-auth-token": token },
      })
      .then(() => Read())
      .catch((error) => console.log(error));
  }

  return (
    <div className="md:px-[50px] px-[20px] py-[30px] mx-auto max-w-[1000px]">
      <Link
        to="/post"
        className="bg-[#f4f4f4] px-[21px] py-[7px] font-medium text-[16px]"
      >
        Back To Posts
      </Link>

      <div className="flex flex-col md:flex-row gap-[50px] items-center border-gray-300 border-[1px] rounded-[4px] px-[20px] py-[10px] mx-auto max-w-[1000px] mb-[20px] mt-[30px]">
        <div className="avatar flex justify-center items-center flex-col">
          <div className="max-w-[170px] min-w-[170px] mx-auto">
            <img
              src={user.avatar}
              alt=""
              className="w-full h-full rounded-[50%]"
            />
          </div>
          <h2>{user.name}</h2>
        </div>

        <div>
          <h2 className="text-[16px] mb-[10px]">{user.text}</h2>
          <p className="text-[12.5px] text-[#AAAA] mb-[10px]">{user.date}</p>
          <div className="flex items-center gap-[10px]">
            <button
              className="h-[38px] w-[57px] bg-[#f4f4f4] flex justify-center items-center text-[20px]"
              onClick={() => handleLike(id)}
            >
              <BiSolidLike />
              {user.likes?.length > 0 && (
                <span className="ml-1">{user.likes.length}</span>
              )}
            </button>

            <button
              className="h-[38px] w-[57px] bg-[#f4f4f4] flex justify-center items-center text-[20px]"
              onClick={() => handleUnlike(id)}
            >
              <BiSolidDislike />
            </button>
            <Link
              to={`/post/${id}`}
              className="px-[21px] py-[7px] bg-primary text-white"
            >
              Discussion{" "}
              {comment.length > 0 && (
                <span className="bg-white text-primary rounded-md px-1">
                  {comment.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-primary px-[10px] py-[10px] font-medium text-white mb-[20px]">
        <h2>Leave a Comment</h2>
      </div>

      <form onSubmit={SubmitText} className="max-w-[1000px] mx-auto mb-[30px]">
        <textarea
          placeholder="Comment the post"
          value={text}
          onChange={(e) => textSet(e.target.value)}
          className="border-gray-300 border-[1px] w-full max-h-[126px] min-h-[126px] mb-[10px] px-[20px] py-[10px] outline-none"
        ></textarea>
        <button className="text-[16px] px-[21px] py-[7px] bg-[#343a40] text-white rounded-[4px]">
          Submit
        </button>
      </form>

      <div>
        {comment.map((data) => (
          <div
            key={data._id}
            className="flex flex-col md:flex-row gap-[50px] items-center border-gray-300 border-[1px] rounded-[4px] md:px-[20px] py-[10px] mx-auto max-w-[1000px] mb-[20px]"
          >
            <div className="avatar flex justify-center items-center flex-col">
              <div className="max-w-[170px] min-w-[170px] mx-auto">
                <img
                  src={data.avatar}
                  alt=""
                  className="w-full h-full rounded-[50%]"
                />
              </div>
              <h2 className="text-primary font-bold">{data.name}</h2>
            </div>

            <div>
              <h2 className="text-[16px] mb-[10px]">{data.text}</h2>
              <p className="text-[12.5px] text-[#AAAA] mb-[10px]">
                {data.date}
              </p>
              <pre>authUser - {authUser._id}</pre>
              <pre>data user - {data.user}</pre>
              {authUser._id === data.user && (
                <button
                  onClick={() => handleDeleteComment(data._id)}
                  className="bg-red-700 text-white px-4 py-3  "
                >
                  <RiCloseLargeFill />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostData;
