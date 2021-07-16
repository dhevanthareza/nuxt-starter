<template>
  <v-form>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-text-field label="No. Registrasi" outlined dense></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field label="Nama User" outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field label="Nama Pemohon" outlined dense></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field label="Alamat Pemohon" outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field label="No. KTP" outlined dense></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-select label="kecamatan"> </v-select>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-select label="Kota/Kab"> </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field label="No Telepon" outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-file-input label="Upload Ktp" outlined dense></v-file-input>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <div class="update ml-auto mr-auto mt-3">
        <v-btn type="submit" color="primary">
          Submit
        </v-btn>
      </div>
    </v-row>
  </v-form>
</template>
