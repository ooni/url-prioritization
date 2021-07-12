import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'ooni-components'
import OONILogo from 'ooni-components/components/svgs/logos/OONI-HorizontalMonochromeInverted.svg'
import styled from 'styled-components'

import { useUser } from './lib/hooks'
import { LoginModal } from './LoginForm'
import Loading from './Loading'

const NavItem = styled(Box).attrs({
  fontSize: 2
})`
  cursor: pointer;

  & a, & a:hover, & a:visited, & a:active {
    color: inherit;
    text-decoration: none;
  }
`

const NavBar = () => {
  const router = useRouter()
  const [showLoginModal, setShowLogin] = useState(false)
  const { user, loading } = useUser()

  const hideLogin = useCallback(() => setShowLogin(false), [])

  return (
    <>
      <Flex bg='blue5' color='white' p={3} alignItems='center'>
        <NavItem><Link href='/'><OONILogo height='32px' /></Link></NavItem>
        <Box sx={{ position: 'absolute', right: 8 }}>
        {!loading && user && 'nick' in user && <Box> {user.nick} ({user.role}) </Box>}
        {!loading && !user && (
          router.pathname !== '/login'
            ? (
            <NavItem><Link href='/login'>
              Login
            </Link></NavItem>
              )
            : null
        )}
        {loading && <Loading size={32} />}
        </Box>
      </Flex>
      <LoginModal isShowing={showLoginModal} hide={hideLogin} />
    </>
  )
}

export default NavBar
