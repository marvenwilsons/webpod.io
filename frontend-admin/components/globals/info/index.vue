<template>
    <div class="flex padtop050 padleft050 padright050 padbottom025"  >
        <div class="padright050" >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#409eff" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
        </div>
        <div class="paneTextColor" >{{myData.msg || ''}}</div>
    </div>
</template>
<script>
export default {
    props: ['config','myData']
}
</script>