<template>
  <div>
    <hr />
    <div class="panel-row">
      <vpd-icon name="credit-card" />
      <div class="panel-label">Container name</div>
      <div class="panel-value">
        <input
          type="text"
          v-model.trim="activeElement.name"
          placeholder="Container name is required"
        />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="grid" />
      <div class="panel-label">display</div>
      <div class="panel-value">
        <select v-model="activeElement.display">
          <option>flex</option>
          <option>block</option>
        </select>
      </div>
    </div>

    <div class="panel-row" v-show="activeElement.display === 'flex'">
      <vpd-icon name="shuffle" />
      <div class="panel-label">Direction</div>
      <div class="panel-value">
        <select v-model="activeElement.dir">
          <option>row</option>
          <option>row-reverse</option>
          <option>column</option>
          <option>column-reverse</option>
        </select>
      </div>
    </div>

    <div class="panel-row" v-show="activeElement.display === 'flex'">
      <vpd-icon name="align-justify" />
      <div class="panel-label">Distribution</div>
      <div class="panel-value">
        <select v-model="activeElement.justify">
          <option>flex-start</option>
          <option>space-between</option>
          <option>center</option>
          <option>space-around</option>
          <option>flex-end</option>
        </select>
      </div>
    </div>

    <div class="panel-row" v-show="activeElement.display === 'flex'">
      <vpd-icon name="align-center" />
      <div class="panel-label">Axis Distribution</div>
      <div class="panel-value">
        <select v-model="activeElement.align">
          <option>flex-start</option>
          <option>center</option>
          <option>flex-end</option>
        </select>
      </div>
    </div>

    <hr />
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">Background Color</div>
      <div class="panel-value">{{ activeElement.bgColor }}</div>
      <div class="panel-value">
        <input type="color" v-model="activeElement.bgColor" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="image" />
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div
          class="panel-preview"
          @click="addPic"
          :style="{ backgroundImage: 'url(' + activeElement.backPic + ')' }"
        >
          <vpd-icon name="plus" v-show="!activeElement.backPic" />
        </div>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="square" />
      <div class="panel-label">圆角</div>
      <div class="panel-value">
        <input type="text" v-model="activeElement.radius" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="maximize" />
      <div class="panel-label">边的宽度</div>
      <div class="panel-value">
        <input type="text" v-model="activeElement.borderWidth" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="edit-3" />
      <div class="panel-label">边的颜色</div>
      <div class="panel-value">{{ activeElement.borderColor }}</div>
      <div>
        <input type="color" v-model="activeElement.borderColor" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "braid-container-style",
  props: ["activeElement"],
  methods: {
    addPic() {
      this.$vpd.$emit("upload", payload => {
        this.$vpd.commit("addContainerBackPic", payload);
      });
    }
  }
};
</script>
