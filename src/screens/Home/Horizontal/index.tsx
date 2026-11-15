import { View } from 'react-native'
import Aside from './Aside'
import PlayerBar from '@/components/player/PlayerBar'
import StatusBar from '@/components/common/StatusBar'
import Header from './Header'
import Main from './Main'
import { HomeDetailStacks } from '../DetailStack'
import { useHomeDetailStack } from '@/store/homeDetail/hook'
import { useNavActiveId } from '@/store/common/hook'
import { createStyle } from '@/utils/tools'

const styles = createStyle({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
  },
  mainCovered: {
    flex: 1,
    opacity: 0,
  },
  detailContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
})

export default () => {
  const activeId = useNavActiveId()
  const hasDetail = useHomeDetailStack().length > 0
  const detailVisible = hasDetail && activeId != 'nav_setting'

  return (
    <View style={styles.root}>
      <StatusBar />
      <View style={styles.container}>
        <Aside />
        <View style={styles.content}>
          <View
            style={detailVisible ? styles.mainCovered : styles.main}
            pointerEvents={detailVisible ? 'none' : 'auto'}
          >
            <Header />
            <Main />
          </View>
          <View style={styles.detailContainer} pointerEvents={detailVisible ? 'auto' : 'none'}>
            <HomeDetailStacks activeId={activeId} />
          </View>
        </View>
      </View>
      <PlayerBar isHome />
    </View>
  )
}
