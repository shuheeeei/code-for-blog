/*
  2つめのForm
  バリデーション
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
  const {
    register, handleSubmit, errors,
  } = useForm<FormInputs>({
    defaultValues: defaultData, // defaultValuesに渡すオブジェクトのプロパティは、useFormのregisterで管理対象にしたform系のタグに指定したnameと一致させる必要がある。そうしないと反映されない。
  });
  const onSubmit = (data: FormInputs) => {
    setData(data);
  };

  return (
    <>
      <h1>react-hook-form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          苗字：
          <input
            type="text"
            name="lastName" // ここのname属性はdefaultValuesに渡すプロパティと合わせる必要がある。合わせないと初期値が入らない
             // register({ required: 'エラーメッセージ' }) と省略可
            ref={register({
              required: {
                value: true,
                message: '苗字を入力してください',
              },
              // pattern: /[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006]/g,
              pattern: {
                value: /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/,
                message: '日本語以外は入力しないでください',
              },
              validate: (name) => {
                if (/破面/g.test(name)) {
                  return '破面という文字は入れないでください！';
                }
                return true; // trueはスルー（validationにひっかからない）
              },
            })}
          />
        </label>

        <label>
          名前：
          <input
            type="text"
            name="firstName"
            ref={register({
              maxLength: {
                value: 3,
                message: '名前は2〜3文字の間で入力してください', // register({ maxLength: 4 }) と生薬可能だがメッセージが空文字になる
              },
              minLength: {
                value: 2, // minLengthとvalueの値を同じにすれば入力文字数を固定できます。
                message: '名前は2〜3文字の間で入力してください',
              },
            })}
          />
        </label>

        <label>
          性別：
          <input type="radio" name="gender" ref={register({ required: '性別を選択してください' })} value="1" />男性
          <input type="radio" name="gender" ref={register({ required: '性別を選択してください' })} value="2" />女性
          <input type="radio" name="gender" ref={register({ required: '性別を選択してください' })} value="3" />Skip
        </label>

        <label>
          年齢：
          <input
            type="number"
            name="age"
            ref={register({
              min: {
                value: 10,
                message: '入力値は10以上100以下にしてください',
              },
              max: {
                value: 100,
                message: '入力値は10以上100以下にしてください',
              },
            })}
          />
        </label>

        <label>
          職業：
          <select name="work" ref={register({ required: '職業を選択してください' })}>
            <option value="">選択してください</option>
            <option value="1">死神代行</option>
            <option value="2">滅却師</option>
            <option value="3">学生</option>
          </select>
        </label>

        <input type="submit" />

      </form>

      <h3>Errors</h3>
      {Object.keys(errors).length !== 0 ? (
        <>
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          {errors.gender && <p className="error">{errors.gender.message}</p>}
          {errors.age && <p className="error">{errors.age.message}</p>}
          {errors.work && <p className="error">{errors.work.message}</p>}
        </>
      ) : 'なし'}
      <hr />

      <h3>send data</h3>
      <p>charactor data is {submitData
        ? `${submitData.lastName + submitData.firstName}(${genderMap.get(submitData.gender)})[${submitData.age}歳] ${workMap.get(submitData.work)}`
        : 'not sent yet'}.
      </p>
      <hr />
    </>
  );
};
