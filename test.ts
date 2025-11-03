/*1) a
2) D
3) b
4) A
5) a
6) c
7) a
8) c
9) a
10) d
11) a/d
12) b
13) d
14) b
15) 
16) c
17) b



1) let - змінна яка може змінювати об.
   const- константа не змін. об.
   var- старе(нікому не нужне) навіть якщо задекларувати в функції буде не локальною а глобальною
2) зміна нашого обʼєкта(нп. довжина масиву)
3) подивитися який тип приписаний 
    
4)  null- пусто, зачасту використовуємо коли треба ввести вручну не використовуємо undefined 
    undefined- не знайдено такої (нпр. змінної)
    void- вопше нічо не повертає наша фукнція 
5) [...a] {...a} 
const obj={a:'a1',b:'b2',c:'c3',d:'d4'};
const {a: newA, b:newB }=obj







6) null - не має данних
    undefined- чогось нема
    {
    age: null|21,
    }

7) це коли наша змінна може приймати або один тип або другий
8) use map
9) any- будь який тип 
    unknown- незрозумілий 
*/

function alo(a: number, b: number): number {
  return a;
}

const usersList = [
  { name: "Sonya" },
  { name: "Sonya" },
  { name: "Sonya" },
  { name: "Sonya" },
];

const obj = { a: "a1", b: "b2", c: "c3", d: "d4" };
const { b: newB = "wefwe", a: newA, ...newObj } = obj;

const ourArr: OurObj[] = [
  { a: "a1", b: "b2", c: "c3", d: "d4" },
  { a: "aa1", b: "bb2", c: "cc3", d: "dd4" },
  { a: "aaa1", b: "bbb2", c: "ccc3", d: "ddd4" },
];

const newArr = ourArr.map(({ d, ...restFields }) => {
  return restFields;
});

type OurObj = {
  a: string;
  b: string;
  c: string;
  d: string;
};
