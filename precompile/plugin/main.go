// (c) 2019-2023, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

package main

import (
	"fmt"

	"github.com/ava-labs/avalanchego/version"
	"github.com/ava-labs/subnet-evm/plugin/evm"
	"github.com/ava-labs/subnet-evm/plugin/runner"

	_ "github.com/yourusername/yourrepository/precompile-evm/bondingCurve"
)

const Version = "v0.1.4"

func main() {
    versionString := fmt.Sprintf("Precompile-EVM/%s Subnet-EVM/%s [AvalancheGo=%s, rpcchainvm=%d]", Version, evm.Version, version.Current, version.RPCChainVMProtocol)
    runner.Run(versionString)
}