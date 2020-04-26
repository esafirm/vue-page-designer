<template>
  <div>
    <hr />
    <div class="panel-row" flex>
      <vpd-icon name="sliders" />
      <div class="panel-label">Row Height</div>
      <div class="panel-value">{{ activeElement.lineHeight }}</div>
      <div class="panel-slider-wrap">
        <vpd-slider :max="5" :min="1" v-model="activeElement.lineHeight" />
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="type" />
      <div class="panel-label">Font Size</div>
      <div class="panel-value">{{ activeElement.fontSize }}rem</div>
      <div class="panel-slider-wrap">
        <vpd-slider :step="0.01" :max="2" :min=".85" v-model="activeElement.fontSize" />
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="edit-3" />
      <div class="panel-label">Color</div>
      <div class="panel-value">{{ activeElement.color }}</div>
      <div>
        <input type="color" v-model="activeElement.color" />
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="bold" />
      <div class="panel-label">Bold</div>
      <div class="panel-value">
        <label class="form-switch">
          <input type="checkbox" v-model="activeElement.fontWeight" />
          <i class="form-icon"></i>
        </label>
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="align-justify" />
      <div class="panel-label">Align</div>
      <div class="panel-value">
        <label class="form-radio tooltip" data-tooltip="Align left">
          <input type="radio" name="align" value="left" v-model="activeElement.textAlign" />
          <i class="form-icon"></i>
          <vpd-icon name="align-left" />
        </label>
        <label class="form-radio tooltip" data-tooltip="Align Center">
          <input type="radio" name="align" value="center" v-model="activeElement.textAlign" />
          <i class="form-icon"></i>
          <vpd-icon name="align-center" />
        </label>
        <label class="form-radio tooltip" data-tooltip="Align Right">
          <input type="radio" name="align" value="right" v-model="activeElement.textAlign" />
          <i class="form-icon"></i>
          <vpd-icon name="align-center" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "braid-txt-style",
  props: ["activeElement"]
};
</script>
