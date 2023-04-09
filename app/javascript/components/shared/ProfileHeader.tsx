import React from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Image from 'react-bootstrap/Image'

type User = {
  activated: boolean
  avatar: {
    url?: string
  }
  email: string
  id: number
  name: string
  username: string
}

type ProfileHeaderProps = {
  canAddGames: boolean
  canEdit: boolean
  defaultAvatarUrl: string
  user: User
  userEditPath: string
}

const ProfileHeader = ({
  canAddGames = false,
  canEdit = false,
  defaultAvatarUrl,
  user,
  userEditPath,
}: ProfileHeaderProps) => {
  console.log({ canEdit, user, defaultAvatarUrl })
  const hasAvatar = !!user.avatar.url
  const avatarUrl = hasAvatar ? user.avatar.url : defaultAvatarUrl

  return (
    <Stack direction="horizontal" gap={3}>
      <Image src={avatarUrl} width="140" />
      <h2>{user.name}</h2>
      {canEdit && (
        <Button href={userEditPath} variant="outline-secondary">
          Edit
        </Button>
      )}
      {canAddGames && <Button className="ms-auto">Add Game</Button>}
    </Stack>
  )
}

export default ProfileHeader
