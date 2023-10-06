# 2. 프로젝트에서 사용하는 외부 서비스 정보를 정리한 문서

## front-service (.env)

```jsx
API_BASE_URL=https://www.sieum.site
BASE_URL=http://localhost:8080
SPOTIFY_CLIENT_ID=c9aa42de893346fcae9aab5c4f1e5b0f
SPOTIFY_CLIENT_SECRET=db1e8c898793468ba287657a3ab69837
GOOGLE_MAP_API_KEY=AIzaSyA7Bz0ZIDOFwIWq4YyYo3cU-tfzyCQqncU
KAKAO_MAP_API_KEY=1c1252b4d425329642c458690fe99854
```

## Django

```jsx
### Django 설치 가이드

> $ pip3 install pipenv   // 가상환경 설치
>
>$ pipenv shell    // 가상환경 실행
>
>$ pipenv install django==4.1   // 장고 설치 (반드시 4.1 이하버젼 깔아야함, 4.2이상부터는 mysql 버젼 8 이상만 지원
>
>$ pip freeze   // 장고가 설치되었는지 확인하는 명령어
>
>$ pip install mysqlclient   // 파이썬용 mysql connector 설치
>
>$ pip install djangorestframework   // 장고 rest api 사용하기 위해 drf 라고 부르는 djangorestframework 설치
>
>$ pip install django-cors-headers   // 장고 cors 에러 해결을 위해 설치
>
>$ django-admin startproject "프로젝트 명"    // 프로젝트 생성
>
>$ python manage.py startapp "앱 명"   // 앱 생성, 스프링의 패키지처럼 장고는 하나의 프로젝트 안에 여러개의 앱 구조로 이루어져있다.
>
>$ python manage.py runserver  // 장고 실행 방법
>
>$ pip install python-decouple // python-decouple 설치
>
>$ pip install pymongo==3.12.3 // pymongo 설치
```

## Recommendation (.env)

```jsx
DB_ID = "사용하고 있는 DB ID";
DB_PWD = "사용하고 있는 DB PASSWORD";

SPOTIFY_ID = "스포티파이 개발자 ID";
SPOTYFY_SECRET = "스포티파이 개발자 SECRET KEY";
```

## community-service-prod (.yml)

```jsx
spring:
  datasource:
    url:
    username:
    password:
    driver-class-name:
    hikari:
      maximum-pool-size:
      minimum-idle:
      connection-timeout:
      connection-init-sql:
      idle-timeout:
      max-lifetime:
      auto-commit:

  servlet:
    multipart:
      max-file-size:

  jpa:
    database:
    database-platform:
    hibernate:
      ddl-auto:
    properties:
      hibernate:
        format_sql:
        default_batch_fetch_size:

cloud:
  aws:
    credentials:
      access-key:
      secret-key:
    region:
      static:
    s3:
      bucket:
```

## oauth-service-prod (.yml)

```jsx
spring:
  datasource:
    url:
    username:
    password:
    driver-class-name:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 10
      connection-timeout: 10000
      connection-init-sql: SELECT 1
      idle-timeout: 600000
      max-lifetime: 1800000
      auto-commit: true
  jpa:
    hibernate:
      ddl-auto:
    properties:
      hibernate:
        format_sql: true
        default_batch_fetch_size:
  #oauth 설정
  security:
    oauth2:
      client:
        registration:
          spotify:
            provider: spotify
            client-id:
            client-secret:
            scope:
            authorization-grant-type:
            redirect-uri:

        provider:
          spotify:
            authorization-uri:
            token-uri:
            user-info-uri:
            user-name-attribute:


jwt:
  secretKey:

  access:
    expiration: 1209600000 # ms -> 1시간
    header: Authorization

  refresh:
    expiration: 1209600000 #  ms -> 2주
    header: Authorization-refresh

  redirect:
```

## member-service-dev (.yml)

```jsx
spring:
  datasource:
    url:
    username:
    password:
    driver-class-name:
      maximum-pool-size:
      minimum-idle:
      connection-timeout:
      connection-init-sql: SELECT 1
      idle-timeout:
      max-lifetime:
      auto-commit:

  servlet:
    multipart:
      max-file-size:

  jpa:
    database:
    database-platform:
    hibernate:
      ddl-auto:
    properties:
      hibernate:
        format_sql: true
        default_batch_fetch_size:
```

## DB

```jsx
CREATE TABLE `members` (
  `member_id` binary(16) NOT NULL,
  `member_created_date` datetime(6) DEFAULT NULL,
  `member_is_deleted` tinyint(1) DEFAULT '0',
  `member_modified_date` datetime(6) DEFAULT NULL,
  `member_album_artist` varchar(255) DEFAULT NULL,
  `member_album_image_url` varchar(255) DEFAULT NULL,
  `member_album_title` varchar(255) DEFAULT NULL,
  `member_nickname` varchar(255) NOT NULL,
  `member_profile_image_url` varchar(255) DEFAULT NULL,
  `member_profile_music_url` varchar(255) DEFAULT NULL,
  `member_refresh_token` varchar(255) DEFAULT NULL,
  `member_region_code` varchar(255) DEFAULT NULL,
  `member_spotify_user_id` varchar(255) NOT NULL,
  `member_hashtags` json DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `music_like` (
  `liked_music_id` bigint NOT NULL AUTO_INCREMENT,
  `album_artist` varchar(255) NOT NULL,
  `album_image_url` varchar(255) DEFAULT NULL,
  `album_title` varchar(255) NOT NULL,
  `music_created_date` datetime(6) NOT NULL,
  `music_is_deleted` tinyint(1) DEFAULT '0',
  `music_uri` varchar(255) NOT NULL,
  `member_id` binary(16) NOT NULL,
  PRIMARY KEY (`liked_music_id`),
  KEY `FK60tog4plxo6iqajcuir4kq373` (`member_id`),
  CONSTRAINT `FK60tog4plxo6iqajcuir4kq373` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `post` (
  `post_id` bigint NOT NULL AUTO_INCREMENT,
  `post_content` text,
  `post_music_uri` varchar(255) NOT NULL,
  `post_album_image` varchar(255) NOT NULL,
  `post_artist` varchar(255) NOT NULL,
  `post_title` varchar(255) NOT NULL,
  `post_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `post_modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `member_id` binary(16) NOT NULL,
  `post_is_deleted` bit(1) NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FK83s99f4kx8oiqm3ro0sasmpww` (`member_id`),
  CONSTRAINT `FK83s99f4kx8oiqm3ro0sasmpww` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `post_like` (
  `member_id` binary(16) NOT NULL,
  `post_id` bigint NOT NULL,
  `post_like_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`,`post_id`),
  KEY `FK_post_TO_post_like_1` (`post_id`),
  CONSTRAINT `FK_member_TO_post_like_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FK_post_TO_post_like_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `follower` (
  `follower_id` binary(16) NOT NULL,
  `follow_created_date` datetime(6) NOT NULL,
  `follower_followee_id` binary(16) NOT NULL,
  `follower_follow_id` binary(16) NOT NULL,
  PRIMARY KEY (`follower_id`),
  UNIQUE KEY `UK9i361js54rlggkftmo3rgal7w` (`follower_followee_id`,`follower_follow_id`),
  KEY `FKfd07rmdixib5icwnimnpgiu24` (`follower_follow_id`),
  CONSTRAINT `FKfd07rmdixib5icwnimnpgiu24` FOREIGN KEY (`follower_follow_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKiqjw0lkvkehl789097i6v1w4j` FOREIGN KEY (`follower_followee_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(50) NOT NULL,
  `member_id` binary(16) NOT NULL,
  `post_id` bigint NOT NULL,
  `comment_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `comment_modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_is_deleted` bit(1) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKmrrrpi513ssu63i2783jyiv9m` (`member_id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`post_id`),
  CONSTRAINT `FKmrrrpi513ssu63i2783jyiv9m` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
