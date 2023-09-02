# 기본 이미지를 설정합니다. 이 경우 Node.js를 기반으로 합니다.
FROM node:18.16.0

# 앱의 디렉토리를 생성합니다.
WORKDIR /app

# 프로젝트의 package.json과 package-lock.json을 복사합니다.
COPY package*.json ./

# npm을 이용해 의존성을 설치합니다.
RUN npm install

# 프로젝트의 모든 파일을 복사합니다.
COPY . .

# React 앱을 빌드합니다.
RUN npm run build

# 빌드 결과를 Nginx 서버에서 제공하도록 설정하기 위해 Nginx 이미지를 사용합니다.
FROM nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf


# React 빌드 결과를 Nginx가 제공할 수 있도록 설정합니다.
COPY --from=0 /app/build /usr/share/nginx/html

# 80 포트를 열어 외부에서 접속이 가능하게 합니다.
EXPOSE 80

# Nginx 서버를 시작합니다.
CMD ["nginx", "-g", "daemon off;"]
