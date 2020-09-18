import React, {
  FC, useState, useEffect,
} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './ArrayForm.css';

type Charactor = {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  work: string;
};

const data: Charactor[] = [
  {
    firstName: '一護', lastName: '黒崎', gender: '1', age: 18, work: '1',
  },
  {
    firstName: '織姫', lastName: '井上', gender: '2', age: 18, work: '3',
  },
];

const genderMap = new Map<string, string>([['1', '男性'], ['2', '女性'], ['3', '他']]);
const workMap = new Map<string, string>([['1', '死神代行'], ['2', '滅却師'], ['3', '学生']]);

export const ArrayForm: FC = () => {
  const [charactor, setCharactor] = useState<Charactor[]>([]);
  const {
    handleSubmit, control, register, reset,
  } = useForm({
    defaultValues: { bleach: charactor },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bleach',
  });

  useEffect(() => {
    reset({
      bleach: data,
    });
  }, [reset]);

  const onSubmit = (submitData: { bleach: Charactor[] }) => {
    console.log(submitData);
    console.log('is not Empty');
    setCharactor(submitData.bleach);
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
                  <input
                    type="text"
                    name={`bleach[${index}].lastName`}
                    ref={register()}
                    defaultValue={field.lastName}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name={`bleach[${index}].firstName`}
                    ref={register()}
                    defaultValue={field.firstName}
                  />
                </td>
                <td>
                  <select
                    name={`bleach[${index}].gender`}
                    ref={register()}
                    defaultValue={field.gender}
                  >
                    <option value="">選択してください</option>
                    <option value="1">男性</option>
                    <option value="2">女性</option>
                    <option value="3">不明</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    name={`bleach[${index}].age`}
                    ref={register()}
                    defaultValue={field.age}
                  />
                </td>
                <td>
                  <select
                    name={`bleach[${index}].work`}
                    ref={register()}
                    defaultValue={field.work}
                  >
                    <option value="">選択してください</option>
                    <option value="1">死神代行</option>
                    <option value="2">滅却師</option>
                    <option value="3">学生</option>
                  </select>
                </td>
                <td>
                  <button type="button" onClick={() => remove(index)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section>
          <button
            type="button"
            onClick={() => append({
              firstName: '一勇', lastName: '黒崎', gender: '1', age: 6, work: '1',
            })}
          >行を追加する
          </button>
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
