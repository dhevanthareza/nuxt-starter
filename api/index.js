import User from './user'
import Role from './role'
import Menu from './menu'
import Permission from './Permission'
import Auth from './auth'
import Provinsi from './Provinsi'
import Kota from './Kota'
import Kecamatan from './Kecamatan'
import Kelurahan from './Kelurahan'
import UmkmCategory from './UmkmCategory'

export default class API {
  constructor($axios) {
    this.User = new User($axios)
    this.Role = new Role($axios)
    this.Menu = new Menu($axios)
    this.Permission = new Permission($axios)
    this.Auth = new Auth($axios)
    this.Provinsi = new Provinsi($axios)
    this.Kota = new Kota($axios)
    this.Kecamatan = new Kecamatan($axios)
    this.Kelurahan = new Kelurahan($axios)
    this.UmkmCategory = new UmkmCategory($axios)
    // TODO: tambahkan untuk resource lainnya
  }
}
