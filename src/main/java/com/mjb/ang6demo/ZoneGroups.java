package com.mjb.ang6demo;

import java.util.ArrayList;
import java.util.List;

public class ZoneGroups {

	
	private String zoneName;
	private List<Zone> zones;
	
	public ZoneGroups() {
		zones = new ArrayList<Zone>();
	}
	
	public String getZoneName() {
		return zoneName;
	}
	public void setZoneName(String zoneName) {
		this.zoneName = zoneName;
	}
	public List<Zone> getZones() {
		return zones;
	}
	public void setZones(List<Zone> zones) {
		this.zones = zones;
	}
	public void addZone(Zone zone) {
		zones.add( zone );
	}
	
	
}
