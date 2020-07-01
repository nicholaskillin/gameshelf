import React, { useState } from 'react'
import { Button, ThemeProvider } from '@planning-center/ui-kit'
import SweetAlert from 'react-bootstrap-sweetalert'

function DeleteUserButton({ user }) {
  const [showModal, setShowModal] = useState(false)
  const token = $('meta[name="csrf-token"]').attr('content')

  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': token,
    },
  })

  function deleteAccount() {
    $.ajax({
      url: `/api/v1/users/${user.id}`,
      type: 'DELETE',
    })
    setShowModal(false)
  }
  return (
    <>
      <ThemeProvider>
        <Button
          title="Delete Account"
          style={{ marginTop: '14px' }}
          onClick={() => setShowModal(true)}
          theme="error"
        />
      </ThemeProvider>
      <SweetAlert
        cancelBtnText="Cancel"
        confirmBtnBsStyle="danger"
        confirmBtnText="Delete Account"
        focusCancelBtn
        onConfirm={deleteAccount}
        onCancel={() => setShowModal(false)}
        show={showModal}
        showCancel
        title="Delete User Account?"
        text="Testing"
        type="danger"
      >
        Once your account is deleted there is no way to recover it.
      </SweetAlert>
    </>
  )
}

export default DeleteUserButton
