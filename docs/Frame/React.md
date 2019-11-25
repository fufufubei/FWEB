<div class='box' v-for='i in arr' >{{i}}</div>

<style>
.box{
    color:#333;
    font-size:30px;
}
</style>
<script>
export default{
    data(){
        return{
            arr:['aaa','bbb']
        }
    }
}
</script>