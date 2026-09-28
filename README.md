# React Form Checkbox Skill Selection

## 目次

* [概要](#概要)
* [学習内容](#学習内容)
* [課題](#課題)
* [条件](#条件)
* [ファイル構成](#ファイル構成)
* [実装](#実装)
* [実装ポイント](#実装ポイント)
* [動作](#動作)
* [Uncontrolled Componentについて](#uncontrolled-componentについて)
* [起動方法](#起動方法)

---

## 概要

`useRef`を使用して、チェックボックスの選択状態を取得するフォームを実装します。

「HTML」「CSS」「JavaScript」の3つのスキルから複数選択でき、送信時に選択されたスキルをコンマ区切りで`alert`に表示します。

Reactの`useState`は使用せず、DOMのチェック状態を`useRef`から直接取得します。

---

## 学習内容

この課題では、以下を学習します。

* `useRef`
* Uncontrolled Component
* Checkbox
* `checked`
* `useRef`によるDOM操作
* `FormEvent`
* 複数の`useRef`の管理
* `filter`
* `join`
* フォーム送信処理
* 再レンダリングを伴わないフォーム処理

---

## 課題

### 問題文

3つのチェックボックスで「HTML」「CSS」「JavaScript」のスキルを選択できるフォームを作成してください。

送信時に、選択されたスキルをコンマ区切りで`alert`で表示してください。

Reactの状態管理は使用せず、`useRef`でチェック状態を取得してください。

### 条件

1. 各チェックボックスに`useRef`を作成する
2. 選択されていない場合は「何も選択されていません」と表示する
3. 再レンダリングを伴わずに実装する

---

## ファイル構成

```text
src/
├── hooks/
│   └── useHandleSkill.ts
├── pages/
│   └── SkillAlert.tsx
├── App.tsx
├── index.css
└── main.tsx
```

---

## 実装

### useHandleSkill.ts

各チェックボックスに`useRef`を作成し、送信時に`checked`を確認します。

```ts
import { useRef } from "react";

const useHandleSkill = () => {
  const htmlRef = useRef<HTMLInputElement>(null);
  const cssRef = useRef<HTMLInputElement>(null);
  const jsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const skills = [
      htmlRef.current?.checked ? "HTML" : "",
      cssRef.current?.checked ? "CSS" : "",
      jsRef.current?.checked ? "JavaScript" : "",
    ].filter(Boolean);

    if (skills.length === 0) {
      alert("何も選択されていません");
      return;
    }

    alert(skills.join(", "));
  };

  return {
    htmlRef,
    cssRef,
    jsRef,
    handleSubmit,
  };
};

export default useHandleSkill;
```

### SkillAlert.tsx

```tsx
import useHandleSkill from "../hooks/useHandleSkill";

const SkillAlert = () => {
  const { htmlRef, cssRef, jsRef, handleSubmit } = useHandleSkill();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="html" className="flex items-center gap-2">
        <input id="html" type="checkbox" ref={htmlRef} />
        HTML
      </label>

      <label htmlFor="css" className="flex items-center gap-2">
        <input id="css" type="checkbox" ref={cssRef} />
        CSS
      </label>

      <label htmlFor="js" className="flex items-center gap-2">
        <input id="js" type="checkbox" ref={jsRef} />
        JavaScript
      </label>

      <button type="submit">送信</button>
    </form>
  );
};

export default SkillAlert;
```

---

## 実装ポイント

### 1. 各チェックボックスに`useRef`を作成

```ts
const htmlRef = useRef<HTMLInputElement>(null);
const cssRef = useRef<HTMLInputElement>(null);
const jsRef = useRef<HTMLInputElement>(null);
```

それぞれの`ref`をチェックボックスに設定します。

```tsx
<input type="checkbox" ref={htmlRef} />
<input type="checkbox" ref={cssRef} />
<input type="checkbox" ref={jsRef} />
```

---

### 2. `checked`で選択状態を取得

```ts
htmlRef.current?.checked
```

`checked`はチェックボックスが選択されているかどうかを表します。

```text
チェックあり
↓
true

チェックなし
↓
false
```

---

### 3. 選択されたスキルだけ配列にする

```ts
const skills = [
  htmlRef.current?.checked ? "HTML" : "",
  cssRef.current?.checked ? "CSS" : "",
  jsRef.current?.checked ? "JavaScript" : "",
].filter(Boolean);
```

例えば、

```text
HTML ✓
CSS  ✓
JavaScript ✗
```

の場合、

```ts
["HTML", "CSS"]
```

になります。

---

### 4. `filter(Boolean)`で空文字を削除

選択されていない項目には`""`が入ります。

```ts
["HTML", "", "JavaScript"]
```

これに対して、

```ts
.filter(Boolean)
```

を実行すると、

```ts
["HTML", "JavaScript"]
```

になります。

---

### 5. `join(", ")`でコンマ区切りにする

```ts
skills.join(", ")
```

例えば、

```ts
["HTML", "CSS", "JavaScript"]
```

が、

```text
HTML, CSS, JavaScript
```

になります。

---

## 動作

### HTMLだけ選択

```text
☑ HTML
☐ CSS
☐ JavaScript

[送信]
```

↓

```text
alert:
HTML
```

### HTMLとCSSを選択

```text
☑ HTML
☑ CSS
☐ JavaScript

[送信]
```

↓

```text
alert:
HTML, CSS
```

### すべて選択

```text
☑ HTML
☑ CSS
☑ JavaScript

[送信]
```

↓

```text
alert:
HTML, CSS, JavaScript
```

### 何も選択しない

```text
☐ HTML
☐ CSS
☐ JavaScript

[送信]
```

↓

```text
alert:
何も選択されていません
```

---

## Uncontrolled Componentについて

この課題では`useState`を使用していません。

### Controlled

```tsx
const [skills, setSkills] = useState<string[]>([]);
```

チェック状態をReactのStateで管理します。

```text
Checkbox
   ↓
onChange
   ↓
setState
   ↓
再レンダリング
```

### Uncontrolled

今回はこちらです。

```tsx
const htmlRef = useRef<HTMLInputElement>(null);
```

チェック状態はDOM側が保持します。

```text
Checkbox
   ↓
DOMがcheckedを保持
   ↓
送信
   ↓
ref.current?.checked
```

入力するたびに`setState`を実行しないため、チェック状態の変更によるReactのState更新・再レンダリングを発生させずに処理できます。

---

## 起動方法

```bash
npm install
```

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで表示されたURLにアクセスして動作を確認します。
