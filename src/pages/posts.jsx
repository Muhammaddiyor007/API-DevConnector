import { useEffect, useState } from "react";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "../axios/axios";

function Post() {
  const [post, postSet] = useState([]);
  const [text, textSet] = useState("");
  const token = localStorage.getItem("token");
  const [authUser, setAuthUser] = useState(null);

  function SubmitText(event) {
    event.preventDefault();
    axios
      .post(
        "/api/posts",
        { text: text },
        { headers: { "x-auth-token": token } }
      )
      .then(() => {textSet(""); Read()})
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (!token) return;
    Read();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    axios
      .get("/api/auth", { headers: { "x-auth-token": token } })
      .then((res) => setAuthUser(res.data))
      .catch((error) => console.log(error));
  }, [token]);

  function Read() {
    axios
      .get("/api/posts", { headers: { "x-auth-token": token } })
      .then((res) => {
        if (res.status === 200) postSet(res.data);
      })
      .catch((error) => console.log(error));
  }

  function handleLike(postId) {
    axios
      .put(`/api/posts/like/${postId}`, {}, { headers: { "x-auth-token": token } })
      .then(() => Read())
      .catch((error) => console.log(error));
  }

  function handleUnlike(postId) {
    axios
      .put(`/api/posts/unlike/${postId}`, {}, { headers: { "x-auth-token": token } })
      .then(() => Read())
      .catch((error) => console.log(error));
  }

  function handleDeletePost(postId) {
	axios
	  .delete(`/api/posts/${postId}`, {
		headers: { "x-auth-token": token },
	  })
	  .then(() => Read()) 
	  .catch((error) => console.log(error));
  }
  

  return (
    <div className="md:px-[50px] px-[20px]">
      <div className="py-[30px] max-w-7xl mx-auto px-[135px]">
        <h2 className="text-primary text-[48px] font-bold">Posts</h2>
        <p className="text-[24px]">Welcome to the community</p>
      </div>

      <form onSubmit={SubmitText} className="max-w-[1000px] mx-auto mb-[30px]">
        <h2 className="text-[19px] font-medium bg-primary w-full h-[40px] py-[5px] mb-[10px] text-white px-[20px]">
          Say Something...
        </h2>
        <textarea
			placeholder="Create a post"
			value={text}
			onChange={(e) => textSet(e.target.value)}
			className="border-gray-300 border-[1px] w-full max-h-[126px] min-h-[126px] mb-[10px] px-[20px] py-[10px] outline-none"
		></textarea>

        <button className="text-[16px] px-[21px] py-[7px] bg-[#343a40] text-white">
          Submit
        </button>
      </form>

      <div>
        {post.map((data) => (
          <div
            key={data._id}
            className="flex flex-col md:flex-row gap-[50px] items-center border-gray-300 border-[1px] rounded-[4px] md:px-[20px] py-[10px] mx-auto max-w-[1000px] mb-[20px]"
          >
            <div className="avatar flex justify-center items-center flex-col">
              <div className="max-w-[170px] min-w-[170px] mx-auto">
                <img src={data.avatar} alt="" className="w-full h-full rounded-[50%]" />
              </div>
              <h2 className="text-primary font-bold">{data.name}</h2>
            </div>

            <div>
              <h2 className="text-[16px] mb-[10px]">{data.text}</h2>
              <p className="text-[12.5px] text-[#AAAA] mb-[10px]">{data.date}</p>
              <div className="flex items-center gap-[10px]">
                <button
                  className="h-[38px] w-[57px] bg-[#f4f4f4] flex justify-center items-center text-[20px]"
                  onClick={() => handleLike(data._id)}
                >
                  <BiSolidLike />
                  {data.likes.length > 0 && (
                    <span className="ml-1">{data.likes.length}</span>
                  )}
                </button>
                <button
                  className="h-[38px] w-[57px] bg-[#f4f4f4] flex justify-center items-center text-[20px]"
                  onClick={() => handleUnlike(data._id)}
                >
                  <BiSolidDislike />
                </button>

                <Link to={`/post/${data._id}`} className="px-[21px] py-[7px] bg-primary text-white">
                  Discussion{" "}
                  {data.comments.length > 0 && (
                    <span className="bg-white text-primary rounded-md px-1">
                      {data.comments.length}
                    </span>
                  )}
                </Link>

                {authUser?._id === data.user && (
					<button
						onClick={() => handleDeletePost(data._id)}
						className="bg-red-700 text-white px-4 py-3">
						<RiCloseLargeFill />
					</button>
					)}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
