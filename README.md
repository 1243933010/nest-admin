## logs
### `存放以日期为文件名称的日志文件`

## src
###  **common**
-  ``crypto: 做一下密码加密处理操作 ``  
-  ``filter:异常处理类，接口出现意外错误会走这个文件``
-  ``response全局处理类，接口正常情况下都会走这个文件``
-  ``winston日志类，设定日志的配置类，需要存入日志可以调用这个类``

### **config**

### **images**
- ``图片文件，图片的存放目录，跟全局图片路径配合可以获取简易图片路径``


### **invitation**
- ``具体业务模块接口，暂时用不到``


### **modules**
#### **auth**
- ``jwt具体业务逻辑都在这里面``

#### **schedule**
- ``定时任务业务逻辑，目前有定时写入日志逻辑``


### **permission**
- ``具体业务模块接口，暂时用不到``


### **upload**
- ``图片上传业务接口逻辑``


### **app.module**

``注册模块配置以及全局插件配置``


### **main**

``入口文件``


## **env文件**
``env env.dev env.pro 环境变量配置文件``


-   "@nestjs/common": "^9.0.0",
-   "@nestjs/config": "^2.3.1",
-   "@nestjs/core": "^9.0.0",
-   "@nestjs/jwt": "^10.0.2",
-   "@nestjs/mapped-types": "*",
-   "@nestjs/passport": "^9.0.3",
-   "@nestjs/platform-express": "^9.0.0",
-   "@nestjs/schedule": "^2.2.0",
-   "@nestjs/typeorm": "^9.0.1",
-   "class-transformer": "^0.5.1",
-   "class-validator": "^0.14.0",
-   "cross-env": "^7.0.3",
-   "crypto": "^1.0.1",
-   "multer": "^1.4.5-lts.1",
-   "mysql2": "^3.2.0",
-   "nest-winston": "^1.9.1",
-   "passport": "^0.6.0",
-   "passport-jwt": "^4.0.1",
-   "passport-local": "^1.0.0",
-   "reflect-metadata": "^0.1.13",
-   "rxjs": "^7.2.0",
-   "typeorm": "^0.3.12",
-   "winston": "^3.8.2",
-   "winston-daily-rotate-file": "^4.7.1"