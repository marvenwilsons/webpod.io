<template>
    <div class="flex padtop050 padleft050 padright050 padbottom025"  >
        <div class="padright050" >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#e6a23c" d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" />
            </svg>
        </div>
        <div style="color:#e6a23c;" >{{myData.msg}}</div>
    </div>
</template>
<script>
export default {
    props: ['config','myData']
}
</script>