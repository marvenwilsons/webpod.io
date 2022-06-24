```html
<wp-dropdown-one>
    <template  v-slot:trigger="{ on, attrs }" >
        <!-- trigger for the menu -->
        <v-btn
        v-bind="attrs"
        v-on="on"
         outlined class="marginleft050 rounded" v-ripple="false" small tile dense icon text fab >
            <v-icon  class=" pointer" >mdi-filter</v-icon>
        </v-btn>
    </template>
    <template v-slot:content="{close}" >
        <!-- close the dropdown -->
         <userFilter
         @apply="close()"
         />
    </template>
</wp-dropdown-one>
```