import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function Post() {
  const { slug } = useParams();
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    import(`../posts/${slug}.md`)
      .then(res => fetch(res.default).then(r => r.text()))
      .then(text => setContent(text));
  }, [slug]);

  return (
    <div className="post">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Post;