<template>
  <main>
    <div v-if="editor">
      <v-btn icon tile @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" > <v-icon>mdi-format-bold</v-icon> </v-btn>
      <v-btn icon tile @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" > <v-icon>mdi-format-italic</v-icon> </v-btn>
      <v-btn icon tile @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" > <v-icon>mdi-format-strikethrough</v-icon> </v-btn>
      <!-- <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        code
      </button> -->
      <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button> -->
      <!-- <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button> -->
      <v-btn icon tile @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }" > 
        <v-icon>mdi-format-paragraph</v-icon> 
      </v-btn>
      <v-btn icon tile @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" > 
        <v-icon>mdi-format-header-1</v-icon> 
      </v-btn>
       <v-btn icon tile @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" > 
        <v-icon>mdi-format-header-2</v-icon> 
      </v-btn>
       <v-btn icon tile @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" > 
        <v-icon>mdi-format-header-3</v-icon> 
      </v-btn>
       <v-btn icon tile @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" > 
        <v-icon>mdi-format-header-4</v-icon> 
      </v-btn>
       <v-btn icon tile @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }" > 
        <v-icon>mdi-format-header-5</v-icon> 
      </v-btn>
       <v-btn icon tile @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }" > 
        <v-icon>mdi-format-header-6</v-icon> 
      </v-btn>
      <v-btn icon tile @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" > 
        <v-icon>mdi-format-list-bulleted</v-icon> 
      </v-btn>
      <v-btn icon tile @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }"> 
        <v-icon>mdi-format-list-bulleted</v-icon> 
      </v-btn>

      <!-- <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button> -->
      <v-btn icon tile @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }" > 
        <v-icon>mdi-format-quote-close</v-icon> 
      </v-btn>

      <!-- <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button @click="editor.chain().focus().undo().run()">
        undo
      </button>
      <button @click="editor.chain().focus().redo().run()">
        redo
      </button> -->
  </div>
  <div class="paneBorder pad050" style="height:300px; overflow:auto; background: #fafafa" >
    <editor-content :editor="editor" />
  </div>
  </main>
</template>
<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  props: ['content'],

  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    const t = this
    this.editor = new Editor({
      onUpdate({ editor }) {
        t.$emit('contentChange', editor.getHTML())
      },
      content: t.content || ``,
      extensions: [
        StarterKit,
      ],
    })
    if(this.editor) {
      console.log('yes')
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style  >
/* Basic editor styles */
 .ProseMirror > * + * {
	 margin-top: 0.75em;
}
 .ProseMirror ul, .ProseMirror ol {
	 padding: 0 1rem;
}
 .ProseMirror h1, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4, .ProseMirror h5, .ProseMirror h6 {
	 line-height: 1.1;
}
 .ProseMirror code {
	 background-color: rgba(97, 97, 97, 0.1);
	 color: #616161;
}
 .ProseMirror pre {
	 background: #0d0d0d;
	 color: #fff;
	 font-family: 'JetBrainsMono', monospace;
	 padding: 0.75rem 1rem;
	 border-radius: 0.5rem;
}
 .ProseMirror pre code {
	 color: inherit;
	 padding: 0;
	 background: none;
	 font-size: 0.8rem;
}
 .ProseMirror img {
	 max-width: 100%;
	 height: auto;
}
 .ProseMirror blockquote {
	 padding-left: 1rem;
	 border-left: 2px solid rgba(13, 13, 13, 0.1);
}
 .ProseMirror hr {
	 border: none;
	 border-top: 2px solid rgba(13, 13, 13, 0.1);
	 margin: 2rem 0;
}
 
</style>