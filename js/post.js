const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const posts = JSON.parse(localStorage.getItem("posts")) || [];
const post = posts.find((item) => item.id === id);

if (!post) {
  alert("글을 찾을 수 없습니다.");
  location.href = "blog.html";
}

// 화면 출력
document.getElementById("title").innerText = post.title;
document.getElementById("date").innerText = post.date;
document.getElementById("content").innerHTML = post.content;

// 삭제 기능
function deletePost() {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter((item) => item.id !== id);
  localStorage.setItem("posts", JSON.stringify(posts));

  alert("삭제 완료");
  location.href = "blog.html";
}
