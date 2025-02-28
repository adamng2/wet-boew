/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * @title findPotentialPII Unit Tests
 * @overview Test the findPotentialPII helper function behaviour
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @polmih @duboisp
 */
( function( $, wb ) {

/*
 * Create a suite of related test cases using `describe`. Test suites can also be
 * nested in other test suites if you want to use the same setup `before()` and
 * teardown `after()` for more than one test suite (as is the case below.)
 */
describe( "findPotentialPII test suite", function() {
	var sandbox = sinon.createSandbox();

	before( function() {
	} );

	after( function() {
		sandbox.restore();
	} );

	/*
	 * Test PII patterns match
	 */
	describe( "PII patterns match", function() {

		before( function() {
		} );

		after( function() {
		} );

		it( "should match 8 or more digits", function() {
			expect( wb.findPotentialPII( "master:5428735149026050, phone:514-514-5144, SIN:123 123-123, driving license:P12345678912345, bank account: 003-1234567", true ) ).to.equal( "master:, phone:, SIN:, driving license:P, bank account: " );
		} );

		it( "should match canadian nr passport", function() {
			expect( wb.findPotentialPII( "passport Nr:AB123456, passport Nr:AB 123456, passport Nr:AB-123456", true ) ).to.equal( "passport Nr:, passport Nr:, passport Nr:" );
		} );

		it( "should match email pattern", function() {
			expect( wb.findPotentialPII( "email:1@example.com", true ) ).to.equal( "email:" );
		} );

		it( "should match postal code pattern", function() {
			expect( wb.findPotentialPII( "postal code:K2C3N2, postal code:K2C 3N2, postal code:K2C-3N2", true ) ).to.equal( "postal code:, postal code:, postal code:" );
		} );

		it( "should match username = value", function() {
			expect( wb.findPotentialPII( "username:John, username=John, user:John, user=John", true ) ).to.equal( ", , , " );
		} );

		it( "should match password = value", function() {
			expect( wb.findPotentialPII( "password:P123456, password=P123456, pass:P123456, pass=P123456", true ) ).to.equal( ", , , " );
		} );
	} );

} );

}( jQuery, wb ) );
