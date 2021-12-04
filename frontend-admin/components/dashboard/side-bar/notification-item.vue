<template>
  <div class="fullwidth" >
    <section class="flex spacebetween marginbottom050"  role="name and time">
      <span style="color: #222;" >
        <strong>
          APP NAME
        </strong>
      </span>
      <span>
        2:20 PM
      </span>
    </section>
    <section style="max-height:120px; min-height:50px;" class="fullwidth" role="body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quod ex esse tempora reprehenderit reiciendis nostrum suscipit a amet? Saepe ad asperiores nam reprehenderit esse veritatis dolor eaque temporibus voluptatem?
    </section>
    <section class="flex flexend margintop050" >
      <div class="marginright050 pointer flat_action" >
        DELETE
      </div>
      <div class="pointer flat_action" >
        OPEN
      </div>
    </section>
  </div>
</template>

<style>
.flat_action_plain:hover {
  background: rgb(211, 211, 211);
  text-decoration: underline;
  cursor: pointer;
}

.flat_action{
  padding: 6px;
  padding-left: 13px;
  padding-right: 13px;
}
.flat_action:hover {
  background: rgb(211, 211, 211);
  padding: 6px;
  padding-left: 13px;
  padding-right: 13px;
  text-decoration: underline;
  cursor: pointer;
}
</style>