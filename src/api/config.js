export const  BASE_URL='http://127.0.0.1:80/weteamjava/' //http://111.230.231.12:8888

export default {
  //login
  getCode: BASE_URL + 'verifyCode',
  login: BASE_URL + 'userCustomer_login',
  //获取当前登录用户信息
  getCurrentuser: BASE_URL + 'userCustomer_findUserInfor',
  //用户管理
  userfindAll: BASE_URL + 'adminCustomer_findAll',
  userInsert: BASE_URL + 'adminCustomer_insert',
  userUpdate: BASE_URL + 'adminCustomer_update',
  userDelete: BASE_URL + 'adminCustomer_delete',
  userSearch: BASE_URL + 'adminCustomer_search',
  userTop: BASE_URL + 'adminCustomer_adminRecommendBatchCustomer',
  userbatchDelete: BASE_URL + 'adminCustomer_adminBatchDeleteCustomer',
  //角色管理
  rolefindAll: BASE_URL + 'adminRole_findAll',
  roleInsert: BASE_URL + 'adminRole_insert',
  roleUpdate: BASE_URL + 'adminRole_update',
  roleDelete: BASE_URL + 'adminRole_delete',
  roleSearch: BASE_URL + 'adminRole_search',
  rolebatchDelete: BASE_URL + 'adminRole_adminBatchDeleteRole',
  //客服管理
  customerfindAll: BASE_URL + 'adminServicer_findAll',
  customerInsert: BASE_URL + 'adminServicer_insert',
  customerUpdate: BASE_URL + 'adminServicer_update',
  customerDelete: BASE_URL + 'adminServicer_delete',
  customerSearch: BASE_URL + 'adminServicer_search',
  customerbatchDelete: BASE_URL + 'adminServicer_adminBatchDeleteServicer',
  // 店铺认证
  shopfindAll: BASE_URL + 'adminShopCertificate_findAll',
  shopUpdate: BASE_URL + 'adminShopCertificate_update',
  shopDelete: BASE_URL + 'adminShopCertificate_delete',
  shopSearch: BASE_URL + 'adminShopCertificate_search',
  shopbatchDelete: BASE_URL + 'adminShopCertificate_adminBatchDeleteShopCertificate',
  shopbatchAudit: BASE_URL + 'adminShopCertificate_adminBatchAuditShopCertificate',
//collect
   //内容分类
    First_insert: BASE_URL + 'adminCategoryFirst_insert',
    First_update: BASE_URL + 'adminCategoryFirst_update',
    First_delete: BASE_URL + 'adminCategoryFirst_delete',
    First_findAll: BASE_URL + 'adminCategoryFirst_findAll',
    First_search: BASE_URL + 'adminCategoryFirst_search',
    First_BatchDelete: BASE_URL + 'adminCategoryFirst_adminBatchDeleteCategoryFirst',
    Second_insert: BASE_URL + 'adminCategorySecond_insert',
    Second_update: BASE_URL + 'adminCategorySecond_update',
    Second_delete: BASE_URL + 'adminCategorySecond_delete',
    Second_findAll: BASE_URL + 'adminCategorySecond_findAll',
    Second_search: BASE_URL + 'adminCategorySecond_search',
    Second_BatchDelete: BASE_URL + 'adminCategorySecond_adminBatchDeleteCategorySecond',
    Three_insert: BASE_URL + 'adminCategoryThree_insert',
    Three_update: BASE_URL + 'adminCategoryThree_update',
    Three_delete: BASE_URL + 'adminCategoryThree_delete',
    Three_findAll: BASE_URL + 'adminCategoryThree_findAll',
    Three_search: BASE_URL + 'adminCategoryThree_search',
    Three_BatchDelete: BASE_URL + 'adminCategoryThree_adminBatchDeleteCategoryThree',
    //城市分类
      Prov_insert: BASE_URL + 'adminProvCategroy_insert',
      Prov_update: BASE_URL + 'adminProvCategroy_update',
      Prov_delete: BASE_URL + 'adminProvCategroy_delete',
      Prov_findAll: BASE_URL + 'adminProvCategroy_findAll',
      Prov_search: BASE_URL + 'adminProvCategroy_search',
      Prov_BatchDelete: BASE_URL + 'adminProvCategroy_batchDeleteProvCategory',
      City_insert: BASE_URL + 'adminCityCategroy_insert',
      City_update: BASE_URL + 'adminCityCategroy_update',
      City_delete: BASE_URL + 'adminCityCategroy_delete',
      City_findAll: BASE_URL + 'adminCityCategroy_findAll',
      City_search: BASE_URL + 'adminCityCategroy_search',
      City_BatchDelete: BASE_URL + 'adminCityCategroy_batchDeleteCityCategory',
      Dist_insert: BASE_URL + 'adminDistCategroy_insert',
      Dist_update: BASE_URL + 'adminDistCategroy_update',
      Dist_delete: BASE_URL + 'adminDistCategroy_delete',
      Dist_findAll: BASE_URL + 'adminDistCategroy_findAll',
      Dist_search: BASE_URL + 'adminDistCategroy_search',
      Dist_BatchDelete: BASE_URL + 'adminDistCategroy_batchDeleteDistCategory',
//content
  //案例管理、新闻管理、帮助管理(Article)
  articlefindAll: BASE_URL + 'adminArticle_findAll',
  articleInsert: BASE_URL + 'adminArticle_insert',
  articleUpdate: BASE_URL + 'adminArticle_update',
  articleDelete: BASE_URL + 'adminArticle_delete',
  articleSearch: BASE_URL + 'adminArticle_search',
  articleTop: BASE_URL + 'adminArticle_adminRecommendBatchArticle',
  articlebatchDelete: BASE_URL + 'adminArticle_adminBatchDeleteArticle',
  //服务管理
  serviceUpdate: BASE_URL + 'adminShopService_update',
  servicebatchDelete: BASE_URL + 'adminShopService_adminBatchDeleteShopService',
  servicefindAll: BASE_URL + 'adminShopService_findAll',
  serviceTop: BASE_URL + 'adminShopService_adminRecommendBatchShopService',
  servicebatchAudit: BASE_URL + 'adminShopService_adminAuditBatchShopService',
  serviceSearch: BASE_URL + 'adminShopService_search',
//任务管理
  taskUpdate : BASE_URL + 'adminTask_update',
  taskfindAll: BASE_URL + 'adminTask_findAll',
  taskDelete: BASE_URL + 'adminTask_delete',
  taskbatchDelete: BASE_URL + 'adminTask_adminBatchDeleteTask',
  taskTop : BASE_URL + 'adminTask_adminRecommendBatchTask',
  taskbatchAudit : BASE_URL + 'adminTask_adminAuditBatchTask',
  taskbatchDelay  : BASE_URL + 'adminTask_adminDelayBatchTask',
  taskbatchClose  : BASE_URL + 'adminTask_adminCloseBatchTask',
  taskSearch  : BASE_URL + 'adminTask_search',
  //任务管理的稿件管理
   draftDelete : BASE_URL + 'adminTaskSubmission_delete',
   draftfindAll : BASE_URL + 'adminTaskSubmission_findAll',
   draftbatchDelete: BASE_URL + 'adminTaskSubmission_adminBatchDeleteTaskSubmission',
   draftbatchAudit : BASE_URL + 'adminTaskSubmission_adminAuditBatchTaskSubmission',
   draftSearch : BASE_URL + 'adminTaskSubmission_search',
  //留言管理
   commentDelete : BASE_URL + 'adminDataMessage_delete',
   commentfindAll  : BASE_URL + 'adminDataMessage_findAll',
   commentbatchDelete  : BASE_URL + 'adminDataMessage_adminBatchDeletedataMessage',
   commentSearch : BASE_URL + 'adminDataMessage_search',
//作品管理
  worksUpdate  : BASE_URL + 'adminWorks_update',
  worksbatchDelete  : BASE_URL + 'adminWorks_adminBatchDeleteMemberWorks',
  worksfindAll  : BASE_URL + 'adminWorks_findAll',
  worksTop : BASE_URL + 'adminWorks_adminRecommendBatchMemberWorks',
  worksSearch : BASE_URL + 'adminWorks_search',
  worksbatchAudit : BASE_URL + 'adminWorks_adminBatchAuditMemberWorks',
//站信管理
   //站信回复列表站信回复列表
   replyDelete: BASE_URL + 'adminDialogMessage_delete',
   replybatchDelete : BASE_URL + 'adminDialogMessage_adminBatchDeleteDialogMessage',
   replyfindAll : BASE_URL + 'adminDialogMessage_findAll',
   replySearch : BASE_URL + 'adminDialogMessage_search',
 // 站信管理的站信主题列表
   themeDelete: BASE_URL + 'adminDialog_delete',
   themebatchDelete : BASE_URL + 'adminDialog_adminBatchDeleteDialog',
   themefindAll : BASE_URL + 'adminDialog_findAll',
   themeSearch : BASE_URL + 'adminDialog_search',
//global
  //文件管理
  fileInsert: BASE_URL + 'fileInteract_insert',
  filefindUnuse: BASE_URL + 'fileInteract_findUnuseFile',
  fileDelete: BASE_URL + 'fileInteract_delete',
  filefindAll: BASE_URL + 'fileInteract_findAll',
  fileSearch: BASE_URL + 'fileInteract_search',
  fileBatchDelete: BASE_URL + 'fileInteract_adminBatchDeleteFile'

}