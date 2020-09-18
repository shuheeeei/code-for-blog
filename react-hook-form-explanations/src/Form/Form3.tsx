/*
  3つめのForm
  watchとformStateの中身
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
}

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
  const [submitData, setData] = useState<string>('');
  const {
    register, handleSubmit, errors, formState, watch,
  } = useForm<FormInputs>({
    defaultValues: defaultData,
  });
  const onSubmit = (data: FormInputs) => {
    console.log('submit');
    setData(`${data.lastName + data.firstName}(${genderMap.get(data.gender)}) ${workMap.get(data.work)}`);
  };

  const {
    isDirty, isSubmitting, touched, submitCount,
  } = formState;

  // すべて入力を監視したいのならば watch() でOK.
  const watchNames = watch(['firstName', 'lastName']);
  const watchAll = watch();

  return (
    <>
      <h1>react-hook-form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          苗字：
          <input
            type="text"
            name="lastName" // ここのname属性はdefaultValuesに渡すプロパティと合わせる必要がある。合わせないと初期値が入らない
            ref={register({
              required: {
                value: true,
                message: '苗字を入力してください', // register({ required: 'エラーメッセージ' }) と省略可
              },
            })}
          />
        </label>

        <label>
          名前：
          <input
            type="text"
            name="firstName"
            ref={register}
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
          <input type="number" name="age" ref={register({ min: { value: 10, message: '入力値は10以上にしてください' } })} />
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

        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? '送信中' : '送信'}
        />

      </form>

      <h3>Errors</h3>
      {Object.keys(errors).length !== 0 ? (
        <>
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          {errors.gender && <p className="error">{errors.gender.message}</p>}
          {errors.work && <p className="error">{errors.work.message}</p>}
        </>
      ) : 'なし'}
      <hr />

      <h3>send data</h3>
      <p>charactor data is {submitData || 'not sent yet'}.</p>
      <hr />

      <h3>isDirty</h3>
      <p>isDirty: {isDirty ? 'Dirty' : 'Not Dirty'}</p>
      <hr />

      <h3>touched</h3>
      <p>first name is {touched.firstName ? 'touched.' : 'original.'}</p>
      <p>last name is {touched.lastName ? 'touched.' : 'original.'}</p>
      <hr />

      <h3>watch</h3>
      <h4>・watch names</h4>
      {/* {firstName: "一護", lastName: "黒崎"} */}
      <p>input last name: {watchNames.lastName}.</p>
      <p>input last name: {watchNames.firstName}.</p>

      <h4>・watch all</h4>
      <p>{Object.keys(watchAll).map((key) => <span>{key}: {watchAll[key as keyof FormInputs]}, </span>)}</p>
      {/* {firstName: "一護", lastName: "黒崎", gender: "1", age: 18, work: "3"} */}
      <hr />

      <h3>submitCount</h3>
      <p>{submitCount}回.</p>
    </>
  );
};
