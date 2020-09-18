import React, { FC, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './ArrayForm.css';

type Charactor = {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  work: string;
};

const genderMap = new Map<string, string>([['1', '男性'], ['2', '女性'], ['3', '他']]);
const workMap = new Map<string, string>([['1', '死神代行'], ['2', '滅却師'], ['3', '学生']]);

export const ArrayForm: FC = () => {
  const [charactor, setCharactor] = useState<Charactor[]>([]);
  const {
    handleSubmit, control, register,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control, // useFormから取得したcontrolを渡してあげる
    name: 'bleach', // 送信データ（オブジェクト）のキーになります。defaultValuesに渡すキーと一致させる
    // { 設定した名前: [data1, data2, ...] }
  });

  const onSubmit = (data: { bleach: Charactor[] }) => {
    setCharactor(data.bleach);
  };

  return (
    <section>
      <h1>react-hook-form useFieldArray</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <thead>
            <tr>
              <th>苗字</th><th>名前</th><th>性別</th><th>年齢</th><th>職業</th><th />
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr>
                <td>
                  <input type="text" name={`bleach[${index}].lastName`} ref={register()} />{/* 手順4,5 */}
                </td>
                <td>
                  <input type="text" name={`bleach[${index}].firstName`} ref={register()} />{/* 手順4,5 */}
                </td>
                <td>
                  <select name={`bleach[${index}].gender`} ref={register()}>{/* 手順4,5 */}
                    <option value="">選択してください</option>
                    <option value="1">男性</option>
                    <option value="2">女性</option>
                    <option value="3">不明</option>
                  </select>
                </td>
                <td>
                  <input type="number" name={`bleach[${index}].age`} ref={register()} />{/* 手順4,5 */}
                </td>
                <td>
                  <select name={`bleach[${index}].work`} ref={register()}>{/* 手順4,5 */}
                    <option value="">選択してください</option>
                    <option value="1">死神代行</option>
                    <option value="2">滅却師</option>
                    <option value="3">学生</option>
                  </select>
                </td>
                <td>
                  <button type="button" onClick={() => remove(index)}>削除</button>{/* 手順6 */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section>
          <button type="button" onClick={() => append({})}>行を追加する</button>{/* 手順6 */}
        </section>
        <input type="submit" />
      </form>

      <h3>送信データ</h3>
      {charactor.map((c) => (
        <p>
          {`${c.lastName + c.firstName} (${c.age}歳 ${genderMap.get(c.gender)}) [${workMap.get(c.work)}]`}
        </p>
      ))}
    </section>
  );
};
