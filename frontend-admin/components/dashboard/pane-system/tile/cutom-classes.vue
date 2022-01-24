<template>
    <div class="flex flexcol" >
        <span class="overline" > CUSTOM CSS CLASSES </span> <br>
        <span class="marginbottom caption marginbottom125" >Css classes to be applied only for this selected tile</span>
        <div>
            <codeEditor
                :readOnly="false"
                :lang="'text'"
                ref="co"
                :code="code"
            ></codeEditor>
        </div>
        <div class="flex flexend margintop025" >
            
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        code: '[]'
    })
}
</script>