<template>
  <div class="stock-container">
        <el-link class="back"><i class="el-icon-d-arrow-left"/>返回</el-link>
        <div>
            <!-- 身份证信息 -->
            <div class="messageBox">
                <p class="title">身份证信息</p>
                <ul>
                    <li>
                        <p>姓名：张三三</p>
                        <p>性别：男</p>
                        <p>出生日期：1964年4月7日</p>
                        <p>住址：浙江省温州市苍南县灵溪镇双洋村 163 号</p>
                        <p>身份证号：330327196404044293</p>
                    </li>
                    <li>
                        <div>
                            <p>指纹有效：是</p>
                            <p>有效期限：永久</p>
                            <p>签发机关：苍南县公安局</p>
                        </div>
                        <img class="touxiang" src="../../assets/img/6.jpg" alt="">
                    </li>
                    <li>
                        <el-button style="margin-top:40px" type="primary"><img src="../../assets/img/btn3.png" alt=""></el-button>
                    </li>
                </ul>
            </div>
            <!-- 存证信息 -->
            <div class="messageBox">
                <p class="title">存证信息</p>
                <ul>
                    <li>
                        <p>卡块：01</p>
                        <p>存证方式：发卡箱</p>
                        <p>存证时间：2020-02-02 11:11:11</p>
                    
                    </li>
                    <li>
                        <p>卡位：01</p>
                        <p>有效期限：永久</p>
                        <p>存证人：张三三</p>
                    </li>
                </ul>
            </div>
            <!-- 代领人信息 -->
            <div class="messageBox">
                <p class="title"> 代领人信息</p>
                <ul>
                 <li>
                    <p>姓名：张三三</p>
                    <p>性别：男</p>
                    <p>出生日期：1964年4月7日</p>
                    <p>住址：浙江省温州市苍南县灵溪镇双洋村 163 号</p>
                    <p>身份证号：330327196404044293</p>
                </li>
                <li>
                    <p>代领人姓名：李四四</p>
                    <p>代领人身份证号：330327196404044299</p>
                    <p>与持证人关系：朋友</p>
                    <p>联系方式：13456301000</p>
                   
                </li>
                <li>

                    <el-button type="primary"><img src="../../assets/img/btn2.png" alt=""></el-button>
                    <el-button type="primary"><img src="../../assets/img/btn1.png" alt=""></el-button>
                </li>
                </ul>
               
            </div>
            <div class="messageBox">
                <p class="title">取证信息</p>
                <div class="oldcard">
                   是否收缴旧证： <el-checkbox size="medium" v-model="checked"></el-checkbox>
                </div>
                <ol>
                    <li><p>业务受理号：19640407</p></li>
                    <li><p>领取方式：代领</p></li>
                    <li><p>取证时间：2020-03-03 11:11:11</p></li>
                </ol>
                <div class="imglist">
                    <img src="../../assets/img/6.jpg" alt="领证人 照片" />
                    <img src="../../assets/img/6.jpg" alt="第一枚指纹 核验图像" />
                    <img src="../../assets/img/6.jpg" alt="第二枚指纹 核验图像" />
                </div>
            </div>
        </div>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      checked: true,
      list: null,
      listLoading: true,
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style  lang="scss" scoped>
    .stock-container{
        padding:20px 60px 60px;
    }
    .back{
        display: block;
        width: 100%;
        text-align: right;
        line-height: 22px;
        color: #599CFF;
        font-size: 15px;
        margin-bottom: 15px;
        i{
            font-size: 20px;
            vertical-align: middle;
        }
    }

    .messageBox{
        background-color: #fbfbfb;
        font-size: 14px;
        line-height: 1.8;
        margin-bottom: 18px;
         padding: 18px 50px ;
         position: relative;
        .title{
            color: #353535;
            font-weight:bold;
            margin-bottom: 20px;
        }
        ul{
            overflow: hidden;
            li{
                float: left;
                height:100%;
                .el-button{
                   display:block;
                   padding: 0;
                   margin: 10px auto;
                    img{
                       display:block;
                        width: 120px;
                        height: 32px;
                    }
                }
                 &:nth-child(1){
                   width: calc(calc(100% - 130px)/2);
                }
                &:nth-child(2){
                    width: calc(calc(100% - 130px)/2);
                    padding-left: 30px;
                    overflow: hidden;
                    div{
                        position:relative;
                        float:left;
                        overflow:hidden;
                    }
                    .touxiang{
                        width:100px;
                        height: 120px;
                        float: left;
                        margin-left:15px;
                    }
                }
                 &:nth-child(3){
                   width: 130px;
                }
                
            }
        }
// --------------------------------------------------------
    .oldcard{
            font-size:18px;
            position:absolute;
            right: 80px;
            top: 15px;
            // transform: translateY(-50%);
        }
        ol{
            overflow: hidden;
            li{
                float: left;
                height:100%;
                width: 33.33%;
                 
            } 
        }
        .imglist{
            overflow: hidden;
            margin-top: 18px;
            img{
                width:100px;
                height: 120px;
                float: left;
                margin-right:90px;
            }
        }
    }









</style>
