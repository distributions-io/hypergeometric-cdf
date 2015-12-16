options( digits = 16 )
library( jsonlite )

m = 12
n = 12
k = 6
x = c( -5, -2.5, 0, 2.5, 5, 8, 12 )
y = phyper( x, m, n, k )

cat( y, sep = ",\n" )

data = list(
	m = m,
	n = n,
	k = k,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/number.json" )
