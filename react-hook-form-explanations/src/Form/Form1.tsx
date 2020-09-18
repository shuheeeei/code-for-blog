/*
  １つめのForm
  基本的な使い方
  送信
  defaultValues
*/

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Form.css';

type FormInputs = {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  work: string;
};

const defaultData: FormInputs = {
  firstName: '一護',
  lastName: '黒崎',
  gender: '1',
  age: 18,
  work: '3',
};

const genderMap = new Map<string, string>([['1', '男性'], ['2', '女性'], ['3', '他']]);
const workMap = new Map<string, string>([['1', '死神代行'], ['2', '滅却師'], ['3', '学生']]);

export const Form = () => {
  const [submitData, setData] = useState<FormInputs>();
  // TypeScriptの場合にはgenericで送信データの型を指定できる
  // →{ form系タグにつけるname属性: 型, ... }
  const {
    register, handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: defaultData,
  });
  const onSubmit = (data: FormInputs) => {
    console.log(data);
    setData(data);
  };

  return (
    <>
      <h1>react-hook-form</h1>

      {/* handleSubmitの引数は送信データを受け取るコールバック関数 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          苗字：
          {/* name属性はdefaultValuesに渡すプロパティと合わせる必要がある。合わせないと初期値が入らない */}
          {/* react-hook-formで管理したいform部品のrefにregisterを渡す */}
          {/* 他のform系タグも同様 */}
          <input type="text" name="lastName" ref={register} />
        </label>

        <label>
          名前：
          <input type="text" name="firstName" ref={register} />
        </label>

        <label>
          性別：
          <input type="radio" name="gender" ref={register} value="1" />男性
          <input type="radio" name="gender" ref={register} value="2" />女性
          <input type="radio" name="gender" ref={register} value="3" />Skip
        </label>

        <label>
          年齢：
          <input type="number" name="age" ref={register({ min: { value: 10, message: '入力値は10以上にしてください' } })} />
        </label>

        <label>
          職業：
          <select name="work" ref={register}>
            <option value="">選択してください</option>
            <option value="1">死神代行</option>
            <option value="2">滅却師</option>
            <option value="3">学生</option>
          </select>
        </label>

        <input type="submit" />
      </form>

      <h3>send data</h3>
      <p>charactor data is {submitData
        ? `${submitData.lastName + submitData.firstName}(${genderMap.get(submitData.gender)})[${submitData.age}歳] ${workMap.get(submitData.work)}`
        : 'not sent yet'}.
      </p>
    </>
  );
};
