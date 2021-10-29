<template>
    <div class="flex padtop050 padleft050 padright050 padbottom025"   >
        <div class="padright050" >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#f56c6c" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
        </div>
        <div style="color:#f56c6c;" >{{myData.msg || ''}}</div>
    </div>
</template>
<script>
export default {
    props: ['config','myData']
}
</script>