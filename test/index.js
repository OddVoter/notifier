const chai = require('chai')

const expect = chai.expect

chai.should()

const db = 'mongodb://localhost/notifier-test'

describe('notifier', function () {
  it('should be properly initialised with its default values', function (done) {
    var notifier = require('../')
    notifier({ mongoUrl: db }, function () {
      expect(notifier.notify).to.be.a('function')
      done()
    })
  })
})

describe('jobs', function () {
  // TODO: write tests for jobs module
})

describe('templates', function () {
  // TODO: write tests for templates module
})

describe('utils', function () {
  describe('.name.format()', function () {
    it('should generate full name based on presence of firstName and lastName props', function () {
      var name = require('../lib/utils/name').format

      expect(name({ firstName: 'bob' })).to.eql('bob')
      expect(name({ firstName: 'bob', lastName: 'builder' })).to.eql('bob builder')
    })

    // unsure if checks are made elsewhere
    /*
     it("should throw exception on invalid input", function() {
       expect(function() {
       name({last_name: "builder"});
       }).to.throw(Error);
     })
     */
  })
})

describe('translations', function () {
  var t = require('../lib/translations').t
  t.test = {
    'templates.email.greeting': 'Hi, {USER_NAME},',
    'templates.email.signature': 'The OddVoter team.'
  }

  t.test2 = {
    'templates.email.greeting': 'Bonjour, {USER_NAME},',
    'templates.email.signature': "L'équipe de OddVoter."
  }

  it('should return linguistic version of prop', function () {
    expect(t('templates.email.signature', 'test')).to.eql('The OddVoter team.')
    expect(t('templates.email.signature', 'test2')).to.eql("L'équipe de OddVoter.")
  })

  it('should return placeholders as-is if no props match', function () {
    expect(t('templates.email.greeting', 'test')).to.eql('Hi, {USER_NAME},')
    expect(t('templates.email.greeting', 'test2')).to.eql('Bonjour, {USER_NAME},')

    expect(t('templates.email.greeting', { user: 'bobby' }, 'test')).to.eql('Hi, {USER_NAME},')
    expect(t('templates.email.greeting', { user: 'bobby' }, 'test2')).to.eql('Bonjour, {USER_NAME},')
  })

  it('should swap placeholders with prop values', function () {
    expect(t('templates.email.greeting', { USER_NAME: 'Bob the builder' }, 'test')).to.eql('Hi, Bob the builder,')
    expect(t('templates.email.greeting', { USER_NAME: 'Bob the builder' }, 'test2')).to.eql('Bonjour, Bob the builder,')
  })
})
