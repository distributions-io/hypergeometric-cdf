options( digits = 16 )
library( jsonlite )

m = 6
n = 5
k = 3
x = c( -5, -2.5, 0, 2.5, 5 )
y = phyper( x, m, n, k )

cat( y, sep = ",\n" )

data = list(
	m = m,
	n = n,
	k = k,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/partial.json" )
