import swal from 'sweetalert2'
import config from '~/config'
export default (context, inject) => {
  const deleteSwal = () => {
    return swal.fire({
      title: 'Apakah kamu yakin?',
      text: 'kamu akan menghapus data ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: config.color.error,
      cancelButtonColor: config.color.warning,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal'
    })
  }
  const verifSwal = (title, text, ok, cancel) => {
    return swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: config.color.primary,
      cancelButtonColor: config.color.warning,
      confirmButtonText: ok,
      cancelButtonText: cancel
    })
  }
  inject('swal', swal)
  inject('deleteSwal', deleteSwal)
  inject('verifSwal', verifSwal)
}
