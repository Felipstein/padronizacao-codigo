# Passo a Passo para criação de um projeto com padronização de commits e lint.

Para que funcione, você precisa iniciar um repositório git no projeto.

## 1. Configurar o Husky

Husky é uma ferramente que intercepta comandos do git. Assim, você pode adicionar funcionalidades que serão automaticamente executadas quando algum comando git for realizado, por exemplo um commit.

### Passo #1

Instalar o husky
```bash
npm install -D husky
```

### Passo #2

Preparar o husky
```bash
npx husky install
```

Você também pode adicionar um script dentro do package.json para isso, e, inclusive, você pode criar esse script por cli:
```bash
npm pkg set scripts.prepare="husky install"

# e então, executa-lo
npm run prepare
```

## 2. Configurar o commitlint

Commitlint é uma biblioteca que padroniza mensagens de um commit para o formato convencional deveras utilizado (e, se não me engano, foram eles mesmo que desenvolveram) pelo Angular.

### Passo #1

Instalar o commitlint
```bash
npm install -D @commitlint/config-conventional @commitlint/cli
```

### Passo #2

Configurar o commitlint
- Crie um arquivo na raiz do projeto com o nome `commitlint.config.js`
- Adicione o código:
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

Ou você pode executar um script que crie esse arquivo automaticamente:
```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

## 3. Configurar o commitlint dentro do husky

Agora, precisamos que o husky intercepte algum commit e execute o cli do commitlint.

Execute esse script para adicionar um hook:
```bash
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```


## 4. Configurar o commitizen

o commitizen trás uma experiência diferente quando fazemos um commit. Ao invés de escrevermos `git commit -m "e tentar acertar o commit convencional por aqui"`. Nós podemos escrever: `git commit`, e ele começa uma sequência de perguntas para criar nosso commit padronizado.

### Passo #1

Instalar o commitizen
```bash
npm install -D commitizen
```

### Passo #2

Iniciar configuração automatica do commitizen
```bash
# npm
npx commitizen init cz-conventional-changelog --save-dev --save-exact

# yarn
npx commitizen init cz-conventional-changelog --yarn --dev --exact

# pnpm
npx commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```

## 5. "Lintar"/Indentar nosso código quando fazermos um commit

Podemos usar o ESLint para lintar nosso código, deixa-lo padronizadinho e corrigido, quando algum commit ocorrer.
Para isso, vamos usar o okonet/lint-staged.

### Passo #1

Instalar o lint-staged
```bash
npm install -D lint-staged
```

### Passo #2

Configurar com o husky
```bash
npx husky add .husky/pre-commit "eslint ./ --fix"
```

## [NÃO TERMINADO] (BÔNUS) Utilizar o commitizen quando fazermos algum commit.

Precisamos agora utilizar o commitizen (npx git-cz) no lugar do "git commit", para que criamos o commit com uma outra experiência. Vamos usar o husky para isso.

_Você pode reparar que, caso execute `npx git-cz`, ele irá começar um processo de commit_

(Ainda não vi como configurar com husky hehe)