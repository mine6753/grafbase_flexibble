/*Grafbase는 데이터를 생성, 조회, 수정, 삭제 (CRUD)작업을 수행할 수 있다.*/
import { g, auth, config } from "@grafbase/sdk";

/*
g - schema 
model() - grafbase 에서 제공하는 메서드, 하나의 노드 형태, 함수에 모델 이름과 필드 정의 객체를 전달해서 모델을 생성
g.model("첫번째: 문자열 ",{두번째: 객체})
g.model('User', { // 모델 명은 'User'
  name: g.string() // 모델의 필드(name)와 각 필드의 타입(g.string())을 정의
})
* */
const User = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(), // optional() *필수가 아닌 선택적 입력이 가능
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g
    .relation(() => Project) //()=> project 이 함수가 호출 될 때, project 모델을 반환함
    .list()
    .optional(),
});

const Project = g.model("Project", {
  title: g.string().length({ min: 3 }),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
});

export default config({
  schema: g,
});
