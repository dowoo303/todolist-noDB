const express = require("express");

let todoData = require("../todoData.json");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(todoData);

  res.json(todoData);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    res.json({ error: "존재하지 않는 ID입니다." });
  }

  res.json(todoData[parseInt(id)]);
});

router.post("/", (req, res) => {
  const { title, desc } = req.body; // 구조분해

  todoData.push({ title, desc, isDone: false }); // 키값과 value값이 같기 때문에 title: title 축소 가능

  console.log(todoData);

  res.json(todoData);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  if (parseInt(id) >= todoData.length) {
    res.status(400).json({ error: "존재하지않는 ID입니다." });
  }
  if (!title && !desc) {
    res
      .status(400)
      .json({ error: "타이틀이나 설명 중에 하나의 값은 입력해야 합니다." });
  }

  todoData[parseInt(id)] = {
    // 내가 body에 입력한 원하는 값으로 업데이트
    title: title ? title : todoData[parseInt(id)].title, // 입력값 : 없으면 그대로
    desc: desc ? desc : todoData[parseInt(id)].desc, // 입력값 : 없으면 그대로
    isDone: todoData[parseInt(id)].isDone, // 기존에 있던 isDone값 그대로 사용
  };

  console.log(todoData);

  res.json(todoData);
});

router.put("/done/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    res.status(400).json({ error: "존재하지않는 ID입니다." });
  }

  todoData[parseInt(id)] = {
    title: todoData[parseInt(id)].title, // 그대로
    desc: todoData[parseInt(id)].desc, // 그대로
    isDone: !todoData[parseInt(id)].isDone, // 부울린값 변경(완료 or 미완료)
  };

  console.log(todoData);

  res.json(todoData);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    // 배열의 길이보다 많은 id값이 들어왔을 경우 오류발생
    res.status(400).json({ error: "존재하지않는 ID입니다." });
  }

  todoData = todoData.filter((v, i) => {
    // id와 index 값이 같은 배열값 삭제
    return parseInt(id) !== i;
  });

  console.log(todoData);

  res.json(todoData);
});

module.exports = router;
