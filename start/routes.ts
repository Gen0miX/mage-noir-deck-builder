/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const CardsController = () => import('#controllers/cards_controller')
const DecksController = () => import('#controllers/decks_controller')
const ComponentsController = () => import('#controllers/components_controller')
const ElementsController = () => import('#controllers/elements_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [AuthController, 'me']).as('auth.me')

router.group(() => {
  router.get('/cards/filter', [CardsController, 'filter'])
  router.get('/cards/:id', [CardsController, 'show'])
  router.get('/cards', [CardsController, 'index'])
})

router.group(() => {
  router.post('/decks/create', [DecksController, 'store'])
  router.delete('/decks/:id', [DecksController, 'remove'])
  router.get('/decks/:id', [DecksController, 'show'])
  router.get('/decks', [DecksController, 'index'])
})

router.group(() => {
  router.get('/components/:id', [ComponentsController, 'show'])
  router.get('/components', [ComponentsController, 'index'])
})

router.group(() => {
  router.get('/components/:id', [ElementsController, 'show'])
  router.get('/components', [ElementsController, 'index'])
})
