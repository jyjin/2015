var Config = (function() {
	return {
        qiniu: {
            tokenUrl: 'http://resv2.sightp.com/index.php/webApiCross/getUploadToken',
            ossPrefix: 'SightPlus_1_5/',
            assetUrl: 'http://7xikrz.com5.z0.glb.qiniucdn.com/'
        },
        postTreatmentUrl: {
            url: 'http://resv2.sightp.com/index.php/PostTreatment/process',
            imageUrl: 'http://resv2.sightp.com/index.php/PostTreatment/image',
            videoUrl: 'http://resv2.sightp.com/index.php/PostTreatment/video',
            audioUrl: 'http://resv2.sightp.com/index.php/PostTreatment/audio'
        },
        allowFileExt: {
            image: 'jpg、jpeg、png、bmp、<br>tif、tiff、pcx、tga、dib、<br>rle、j2c、j2k、jp2、jpc、jpf、<br>jpx、jps、jpe',
            video: 'mp4、3g2、flv、3gp、<br>avi、wmv、mpg、mkv、mov、<br>rmvb、vob、m4v、rm',
            audio: 'mp3、acc、wav、wma、ogg'
        },
        allowFileSize: {
            unit: 1048576,
            image: 5 * 1048576,
            video: 20 * 1048576,
            other: 20 * 1048576,
            audio: 10 * 1048576
        },
        appUrl: {
            backUrl: 'http://console.sightp.com',
            passport: 'http://passport.sightp.com/login',
            userInfo: 'http://user.sightp.com/member/get-login-user',
            videoKey: 'http://resv2.sightp.com/index.php/WebApiCross/QueryVideoKeyFrame',
            resource: 'http://resv2.sightp.com/index.php/WebApiCross/url?id=',
            storage: 'http://storage.sightp.com/StorageApi/url?id=',
            getToken: 'http://passport.sightp.com/service/get-token',
            libraryList: 'http://resv2.sightp.com/index.php/WebApiCross/QueryMaterialInfo',
            avatar: 'http://bbs.sightp.com/avatar.php?size=small&t=',
            iCode: 'http://consolev2.sightp.com/SightPlusWebApi/GetMyICode',
            applyICode: 'http://consolev2.sightp.com/SightPlusWebApi/ApplyICode',
            confirmICode: 'http://consolev2.sightp.com/SightPlusWebApi/ConfirmICode',
            //取出模板中使用的resource id
            getTplResource: 'http://resv2.sightp.com/index.php/WebApiCross/QueryTplResource',
            //getTplResource: 'http://resv2.sightp.cn/index.php/WebApiCross/QueryTplResource',
            //保存模板的七牛URL到storage中
            saveStorageUrl: 'http://storage.sightp.com/StorageApi/saveToStorage',
            //保存模板storageId到对应的resource bundle中
            saveStorageIdToResourceBundle: 'http://resv2.sightp.com/index.php/WebApiCross/SaveTplIdToResourceBundle',
            //保存模板应用
            saveTplProject: 'http://console.sightp.com/service/SightPlusWebApiCross/CreateIeATemplate',
            //更新模板应用
            editTplProject: 'http://console.sightp.com/service/SightPlusWebApiCross/UpdateAssetBundleTemplateCopyInfo',
            //取模板应用信息
            getTplProject: 'http://console.sightp.com/service/SightPlusWebApiCross/QueryAssetBundleTemplateCopyInfo',
            //通过ieId取模板配置文件JSON
            getTplConfigByIeId: 'http://consolev2.sightp.com/index.php/SightPlusWebApi/QueryConfigFileUrl',
            //资源图片地址
            resourceImageUrl: 'http://resv2.sightp.com/index.php/WebApiCross/ImageUrl',
            //模板配置资源
            tplResourceUrl: 'http://tplmanage.sightp.com/service/tpl-config/',
            //取模板名称
            tplNameUrl: 'http://tplmanage.sightp.com/service/get-tpl-name',

            //检测邀请码对应的APP的剩余数
            actionICodeMapAppCount: 'http://user.sightp.com/member/check-action?action=iCodeMapAppLimit',
            //检测邀请码应用数
            actionICodeAppCount: 'http://user.sightp.com/member/check-action?action=iCodeAppLimit',
            //检测可创建公共频道应用数
            actionPublicAppCount: 'http://user.sightp.com/member/check-action?action=publicAppLimit'
        },
        releaseUrl: {
            deviceUrl: 'http://console.sightp.com/service/SightPlusWebApiCross/CreateDeviceTargetVideoIe',
            cloudUrl: 'http://console.sightp.com/service/SightPlusWebApiCross/CreateCloudTargetVideoIe'
        }
    };
})()