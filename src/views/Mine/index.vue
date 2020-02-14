<template>
    <div>
        <Header title="我的喵喵"></Header>
        <div id="content">
            <Login></Login>
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
    import Login from '@/components/Login';
    import Header from '@/components/Header';
    import TabBar from '@/components/TabBar';
    export default{
        name:'Mine',
        components: {Login, TabBar, Header},
    }
</script>

<style>
    
</style>