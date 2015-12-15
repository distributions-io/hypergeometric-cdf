options( digits = 16 )
library( jsonlite )

m = 1
n = 1
k = 1
x = 0:24
y = phyper( x, m, n, k )

cat( y, sep = ",\n" )

data = list(
	m = m,
	n = n,
	k = k,
	data = x,
	expected = y
)


write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/matrix.json" )
