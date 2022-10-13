import React, { useState, useEffect } from "react";
import axios from "axios";

export type Data = {
  Hello: string;
  message: string;
};

export type Message = {
  message: string;
  key: number;
};

function App() {
  const [data, setData] = React.useState<Data>();
  const [message, setMmessage] = React.useState();
  const [lengths, setLengths] = React.useState();
  const [number, setNumber] = React.useState();
  const [texts, setTexts] = useState<Message[]>([]);

  const url = "http://127.0.0.1:8000";

  //データ取得
  const GetData = () => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        alert("失敗しました");
        console.log(error);
      });
  };

  //データ送信
  const generatedata = () => {
    axios
      .post(url + "/msg", {
        message: message,
        max_length: lengths,
        num_return_sequences: number,
      })
      .then((res) => {
        alert("結果が出たよ！");
        setTexts(res.data.message);
        console.log(res.data.message);
        // console.log(texts?.message);
      })
      .catch(function (error) {
        alert("失敗しました");
        console.log(error);
      });
  };

  //messageを受け取る
  const handleChangemessage = (e: any) => {
    setMmessage(e.target.value);
    console.log(message);
  };

  //messageを受け取る
  const handleChangelength = (e: any) => {
    setLengths(e.target.value);
    console.log(message);
  };

  //messageを受け取る
  const handleChangenumber = (e: any) => {
    setNumber(e.target.value);
    console.log(message);
  };

  return (
    <div className="max-w-5xl m-auto">
      <h2 className="text-2xl my-6">文字を自動生成くん</h2>
      {data ? (
        <div>
          <h2 className="text-2xl my-2">テスト結果</h2>
          <p>{data.message}</p>
        </div>
      ) : (
        // <button onClick={GetData} className="">
        //   データを取得
        // </button>
        <></>
      )}
      <br></br>
      <p>文字を入れてみてね</p>
      <p>AIが適当な文章を生成します</p>
      <br></br>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        文章
      </label>
      <input
        type="text"
        onChange={handleChangemessage}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      />
      <br></br>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        生成される文章の長さ
      </label>
      <input
        type="number"
        onChange={handleChangelength}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      />
      <br></br>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        文章の数
      </label>
      <input
        type="number"
        onChange={handleChangenumber}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      />
      <br></br>
      <input
        onClick={generatedata}
        type="submit"
        className="shadow-lg bg-teal-500 shadow-teal-500/50 text-white rounded px-2 py-1 m-2 text-center"
      />
      <p className="text-2xl my-6">出力結果</p>
      {texts &&
        texts.map((text: any, index: any) => (
          <>
            <li className="todo-item my-6" key={index}>
              <span className="todo-item__text">{text}</span>
            </li>
          </>
        ))}
    </div>
  );
}

export default App;
