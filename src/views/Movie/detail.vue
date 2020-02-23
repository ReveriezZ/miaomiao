<template>
    <div id="detailContainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <Loading v-if="isLoading"></Loading>
        <div v-else id="content" class="contentDetail">
            <div class="detail_list">
                <div class="detail_list_bg"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div v-if="image!=''" class="detail_list_img">
                        <img :src="image" alt="">
                    </div>

                    <div class="detail_list_info">
                        <h2>{{detailMovie.title}}</h2>
                        <p>{{detailMovie.original_title}}</p>
                        <p>{{detailMovie.average}}</p>
                        <p><span v-for="(item,index) in detailMovie.genres" :key="index">{{item}} </span></p>
                        <p>{{detailMovie.countries[0]}} / {{detailMovie.durations[0]}}</p>
                        <p>{{detailMovie.mainland_pubdate}}上映</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <p>{{detailMovie.summary}}</p>
            </div>
            <div class="detail_player swiper-container" ref="detail_player">
                <ul class="swiper-wrapper">
                    <li v-for="item in detailMovie.photos" :key="item.id" class="swiper-slide">
                        <div>
                            <img :src=item.cover alt="">
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    export default {
        name:'Detail',
        data(){
          return{
              detailMovie:{},
              image:"",
              isLoading:true,
          }
        },
        components:{
            Header,
        },
        props:['movieId'],
        methods:{
            handleToBack(){
                this.$router.back();
            }
        },
        mounted() {
            this.axios.get('/doubanapi/subject/' + this.movieId + '?apikey=0b2bdeda43b5688921839c8ecb20399b').then((res) => {
                if(res.data){
                    this.detailMovie = res.data;
                    this.image = res.data.images.small;
                    this.isLoading = false;
                    this.$nextTick(()=>{
                        new Swiper(this.$refs.detail_player , {
                            slidesPerView : 'auto',
                            freeMode : true,
                            freeModeSticky: true,
                            autoHeight:true
                        });
                    });

                }
            });
        }
    }
</script>

<style scoped>
#detailContainer{position:absolute;left:0;top:0;z-index:100;width:100%;min-height:100%;background:white}
#detailContainer.slide-enter-active{animation:.3s slideMove;}
@keyframes slideMove {
    0%{transform:translateX(100%);}
    100%{transform:translate(0);}
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: url(/images/movie_1.jpg) 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:100px; margin-right: 20px; text-align: center; font-size: 14px;height: 80px}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;min-height:80px;max-height:80px}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}


</style>