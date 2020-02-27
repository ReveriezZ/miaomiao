<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="pullDown">{{pullDownMsg}}</li>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail(item.id)"><meta name="referrer" content="never"><img :src="item.images.small"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)">{{item.title}} <img v-if="item.has_video" src="@/assets/imax.png"></h2>
                        <p>观众评 <span class="grade">{{item.rating.average}}分</span></p>
                        <p>主演：<span v-for="cast in item.casts" :key="cast.id">{{cast.name}} </span></p>
                        <p>{{item.collect_count}}人看过</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>

    //import Bscroll from 'better-scroll';

    export default {
        name:'NowPlaying',
        data(){
            return{
                movieList:[],
                pullDownMsg:'',
                isLoading:true,
                prevCity:''
            }
        },
        activated(){
            var cityNm = this.$store.state.city.nm;
            if(this.prevCity === cityNm){
                return
            }
            this.isLoading = true;
            this.axios.get('/doubanapi/v2/movie/in_theaters?city='+cityNm).then((res)=>{
                this.movieList = res.data.subjects;
                this.isLoading = false;
                this.prevCity = cityNm;
                // this.$nextTick(()=>{
                //     var scroll = new Bscroll(this.$refs.movie_body,{
                //         tap:true,//允许tap触发
                //         probeType:1,
                //     });//保证数据更新完毕页面渲染完毕再触发
                //     scroll.on('scroll',(pos)=>{
                //         // console.log('scroll');
                //         if(pos.y>30){
                //             this.pullDownMsg = '正在更新中';
                //         }
                //
                //     });
                //     scroll.on('touchEnd',(pos)=>{
                //         // console.log('touchend')
                //         if(pos.y>30){
                //             this.axios.get('/doubanapi/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b').then((res)=>{
                //                 this.pullDownMsg='更新成功';
                //                 setTimeout(()=>{
                //                     this.movieList = res.data.subjects;
                //                     this.pullDownMsg=''
                //                 },1000);
                //             });
                //         }
                //     })
                // });


            });
        },
        methods:{
            handleToDetail(movieId){
                this.$router.push('/movie/detail1/'+movieId);
            },
            handleToScroll(pos){
                if(pos.y>30){
                    this.pullDownMsg = '正在更新中';
                    //this.isLoading = true;
                }
            },
            handleToTouchEnd(pos){
                if(pos.y>30){
                    this.axios.get('/doubanapi/v2/movie/in_theaters?city='+this.prevCity).then((res)=>{
                        this.pullDownMsg='更新成功';
                        this.isLoading = true;
                        setTimeout(()=>{
                            this.isLoading = false;
                            this.movieList = res.data.subjects;
                            this.pullDownMsg=''
                        },2000);
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #content .movie_body{ flex:1; overflow:auto;}
    .movie_body ul{ margin:0 12px; overflow: hidden;}
    .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
    .movie_body .pic_show{ width:64px; height: 90px;}
    .movie_body .pic_show img{ width:100%;}
    .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
    .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
    .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
    .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}
    .movie_body .pullDown{margin:0;padding:0;border:none;text-align: center;}
</style>