import Image from 'next/image'
import NextLink from 'next/link'
import { Box, Flex, Link } from 'ooni-components'
import OONILogo from 'ooni-components/svgs/logos/OONI-HorizontalMonochromeInverted.svg'
// import OONILogo from 'ooni-components/components/svgs/logos/OONI-HorizontalMonochromeInverted.svg'

import React, { useState } from 'react'
import styled from 'styled-components'

import QuickStartGuideModal from './QuickStartGuideModal'
import { useUser } from './lib/hooks'

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
  const { user, logout } = useUser()
  const [showModal, setShowModal] = useState(false)

  const onLogout = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <>
      <QuickStartGuideModal show={showModal} setShowModal={setShowModal} />
      <Flex bg='blue5' color='white' p={3} alignItems='center'>
        <NavItem><NextLink href='/' passHref>
          <Image alt='OONI Logo' src={OONILogo} height={32} width={115} />
        </NextLink></NavItem>
        <Box ml='auto'>
        {user?.logged_in &&
            <>
              <Link href='#logout' color='white' mr={4} onClick={() => setShowModal(true)}>Help</Link>
              <Link href='#logout' color='white' onClick={onLogout}>Logout</Link>
            </>
        }
        </Box>
      </Flex>
    </>
  )
}

export default NavBar
