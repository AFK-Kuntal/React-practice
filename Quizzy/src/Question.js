import { useEffect } from "react";

function Question() {
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch("http://localhost:5000/questions");
        if (!res.ok) throw new Error("Failed to Load Questions");
        const data = res.json();
        console.log(data);
        if (data.Response === "False") throw new Error("Invalid Question");
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestion();
  }, []);
  return <div></div>;
}

export default Question;
